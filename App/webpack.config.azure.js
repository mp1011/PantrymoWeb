const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  externals: {
    react: 'React',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "style", to: "style" },
        { from: "external", to: "external" },
        { from: "articles", to: "articles" },      
        { from: "favicon.ico", to: "favicon.ico" },        
        { from: "index.azure.html", to: "index.html" },   
        { from: "httpd.conf", to: "./" },           
        { from: "robots.txt", to: "robots.txt" },   
        { from: "sitemap.xml", to: "sitemap.xml" },           
        { from: "node_modules/autocompleter/autocomplete.min.js", to: "autocomplete.min.js"}
      ],
    }),
  ],
};