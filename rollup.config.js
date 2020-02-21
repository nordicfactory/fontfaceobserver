import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";
import typescript from '@rollup/plugin-typescript';

const copyright = "© Bram Stein - Damien Seguin. License: BSD-3-Clause";
const banner = `/* Font Face Observer v${pkg.version} - ${copyright} */`;

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const babelCommonOptions = {
  exclude: ["node_modules/**"],
  plugins: [
    "@babel/plugin-transform-typescript",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ],
  extensions
};

const isDev = process.env.NODE_ENV === "development";

export default [
  {
    input: "src/index.ts",
    plugins: [
      resolve({ extensions }),
      typescript(),
      babel({
        ...babelCommonOptions,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: ["ie >= 8"]
              },
              modules: false
            }
          ]
        ]
      }),
      commonjs(),
      isDev ? 0 : uglify()
    ].filter(Boolean),
    output: {
      banner,
      name: "FontFaceObserver",
      file: pkg.browser,
      format: "umd"
    }
  },
  {
    input: "src/index.ts",
    plugins: [
      resolve({ extensions }),
      typescript(),
      babel({
        ...babelCommonOptions,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: ["last 2 versions"]
              },
              modules: false
            }
          ]
        ]
      }),
      isDev ? 0 : uglify()
    ].filter(Boolean),
    output: {
      banner,
      file: pkg.main,
      format: "cjs"
    }
  },
  {
    input: "src/index.ts",
    plugins: [
      resolve({ extensions }),
      typescript(),
      babel({
        ...babelCommonOptions,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: ["last 2 versions"]
              },
              modules: false
            }
          ]
        ]
      })
    ],
    output: {
      banner,
      format: "es",
      file: pkg.module
    }
  }
];
