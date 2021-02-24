import {Shell} from '/src/jsx/components/shell.js'
import {ErrorBoundary} from '/src/jsx/components/error_boundary.js'
import {settings} from '/src/app_settings.mjs'
import '/src/services/array.js'
import '/src/services/group.js'

function startApp()
{
    let emailElement = document.getElementById('email');
    emailElement.href = `mailto: ${settings.email}`;
    emailElement.innerText = settings.email;

    // eslint-disable-next-line no-undef
    ReactDOM.render(React.createElement(
        ErrorBoundary,
        null,
        // eslint-disable-next-line no-undef
        React.createElement(Shell, null)
    ), document.getElementById('root'));
}

startApp();