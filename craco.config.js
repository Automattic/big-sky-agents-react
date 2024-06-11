const webpack = require("webpack");
require( 'dotenv' ).config();

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
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
};
