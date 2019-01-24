const loaderHTML = `<div class="full-page"><div class="spinner">\
<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\
  <circle class="length" fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>\
</svg>\
<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\
  <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>\
</svg>\
<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\
  <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>\
</svg>\
<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\
  <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>\
</svg>\
</div></div>`;

module.exports = require('webpack-boiler')({
  react: true,
  manifest: {
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    short_name: 'researchconnect',
  },
  offline: process.env.NODE_ENV === 'development' ? false : {
    ServiceWorker: {
      output: 'researchconnect-sw.js',
      events: true,
    },
  },
  url: 'https://researchconnect.now.sh',
  pages: [{
    title: 'researchconnect',
    favicon: './src/assets/favicon.ico',
    meta: {
      'theme-color': '#FA7C91',
      description: 'A platform for people sleeping in their vehicles to find overnight parking',
      keywords: 'researchconnect,rent,sleep,vehicle,overnight,parking',
    },
    loader: loaderHTML,
  }],
});