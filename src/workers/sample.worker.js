/* eslint no-restricted-globals: 1 */
/* eslint no-undef: 1 */
// TODO: https://github.com/airbnb/javascript/issues/1632

const ctx = self

ctx.onmessage = ({ data: { message } }) => {
    setTimeout(() => ctx.postMessage({ message: `Received a ${message} and sending a Pong!` }), 1550)
};
