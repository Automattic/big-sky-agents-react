const webpack = require("webpack");
require( 'dotenv' ).config();

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add CSS file support for importing from node_modules
      // const oneOfRule = webpackConfig.module.rules.find((rule) =>
      //   Array.isArray(rule.oneOf)
      // );
      // if (oneOfRule) {
      //   const cssRule = oneOfRule.oneOf.find(
      //     (rule) => rule.test && rule.test.toString().includes(".css")
      //   );
      //   if (cssRule) {
      //     cssRule.exclude = /node_modules/;
      //     oneOfRule.oneOf.unshift({
      //       test: /\.css$/,
      //       include: /node_modules/,
      //       use: ["style-loader", "css-loader"],
      //     });
      //   }
      // }

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        // Add the following plugin to the plugins array
        new webpack.EnvironmentPlugin( {
          GROQ_API_KEY:
            process.env.NODE_ENV === 'development' &&
            ( process.env.GROQ_API_KEY || false ),
          OPENAI_API_KEY:
            process.env.NODE_ENV === 'development' &&
            ( process.env.OPENAI_API_KEY ?? false ),
        } ),
      ]

      webpackConfig.externals = {
        react: "React",
        "react-dom": "ReactDOM",
      };
      return webpackConfig;
    },

  },
  // add babel ["@babel/preset-react", {
  //   "runtime": "automatic"
  // }]
  // babel: {
  //   presets: ["@babel/preset-env"],
  //   plugins: [
  //     ["transform-react-jsx", { runtime: "automatic" }],
  //   ],
  // },
};
