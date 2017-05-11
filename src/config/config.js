const dev = {
  serviceHost: 'http://localhost:8080/'
};

const prod = {
  serviceHost: 'https://api.teamclerks.net/'
}

// This feels VERY hacky, but it will give me a switch to flick
// at build time to get up to production quickly.
const production = false;
export const config = production ? prod : dev;