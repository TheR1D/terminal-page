const LOGO = `>
███████╗██╗  ██╗███████╗██╗     ██╗     
██╔════╝██║  ██║██╔════╝██║     ██║     
███████╗███████║█████╗  ██║     ██║     
╚════██║██╔══██║██╔══╝  ██║     ██║     
███████║██║  ██║███████╗███████╗███████╗
╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
`;
const ABOUT = "Hello world, I'm a Software Engineer based in Czech Republic, Prague with 4+ years experience working on scalable web applications, web services and cloud infrastructure. I have experience in developing and deploying client - server API applications based on Django Rest Framework/Flask (Python), Express.js (NodeJS), RabbitMQ, SQL/NoSQL databases, Nginx, Docker, Google cloud/AWS. I’m a fan of design patterns and development methodologies like OOP, Unit testing and always try to contribute my knowledge to development process.";
const github = 'https://github.com/TheR1D';
const linkedIn = 'https://linkedin.com/in/farkhod-sadykov';
const PS1 = 'web@guest:' + ' ';


function appendElementToTerminal(childElement) {
  document.getElementById('content').appendChild(childElement);
}

function appendTextToTerminal(text, tag = 'p') {
  const textNode = document.createTextNode(text);
  const newElement = document.createElement(tag);
  newElement.classList.add('terminal-text');
  newElement.appendChild(textNode);
  appendElementToTerminal(newElement);
}

function appendLinkToTerminal(link) {
  const textNode = document.createTextNode(link);
  const paragraphElement = document.createElement('p');
  const hrefElement = document.createElement('a');
  hrefElement.appendChild(textNode);
  hrefElement.href = link;
  hrefElement.title = link;
  // parahraphElement.classList.add('terminal-text');
  paragraphElement.appendChild(hrefElement);
  appendElementToTerminal(paragraphElement);
}

function makeHookForInputEnter() {
  const input = document.getElementById('terminal-input');
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      appendTextToTerminal(PS1 + input.value);
      if (input.value in commands) {
        commands[input.value]();
      } else if (input.value === '') {
	console.log('Empty command, ignore.');
      } else {
	appendTextToTerminal('Command not found: ' + input.value + '. Try \'help\' to get started.');
      }
      input.value = '';
      const terminalElement = document.getElementById('terminal');
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }
  });
  // Force input field to be in focus forever.
  input.addEventListener('blur', (event) => input.focus());
}

function clearCommand() {
  const terminalElement = document.getElementById('content');
  terminalElement.innerHTML = '';
}

function aboutCommand() {
  appendTextToTerminal(LOGO, 'PRE');
  appendTextToTerminal(ABOUT);
}

githubCommand = () => appendLinkToTerminal(github);
linkedInCommand = () => appendLinkToTerminal(linkedIn);

window.onload = () => {
  commands = {
    clear: clearCommand,
    about: aboutCommand,
    github: githubCommand,
    linkedin: linkedInCommand,
  }
  // Since we need list of all commands for help text.
  const commandsList = Object.keys(commands).sort().join(', ') + ', help';
  const helpText = 'You can use terminal by typing commands. List of available commands: ' + commandsList; 
  commands.help = () => appendTextToTerminal(helpText);

  aboutCommand();
  makeHookForInputEnter();
}

