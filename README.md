# Bug reproduction example

There is an error when running commitlint when the commitlint dependencies are listed in a subpackage of a monorepo. `Error: Cannot find module 'typescript’` When these dependencies are defined in the top level package.json, there is no issue.

The dependency tree for typescript is different between these cases. For example, when `commitlint` and `@commitlint/config-conventional` are required by the subpackage:

```
npm why typescript

typescript@"^4.6.4 || ^5.0.0" from @commitlint/load@17.7.1
  node_modules/@commitlint/load
    @commitlint/load@"^17.7.1" from @commitlint/cli@17.7.1
    node_modules/@commitlint/cli
      @commitlint/cli@"^17.7.1" from commitlint@17.7.1
      node_modules/commitlint
        dev commitlint@"^17.7.1" from repro-subpackage@undefined
        packages/repro-subpackage
          repro-subpackage@undefined
          node_modules/repro-subpackage
            workspace packages/repro-subpackage from the root project
```

and when they are only in the root package:

```
npm why typescript

typescript@5.2.2 dev
node_modules/typescript
  peer typescript@">=3" from cosmiconfig-typescript-loader@4.3.0
  node_modules/cosmiconfig-typescript-loader
    cosmiconfig-typescript-loader@"^4.0.0" from @commitlint/load@17.7.1
    node_modules/@commitlint/load
      @commitlint/load@"^17.7.1" from @commitlint/cli@17.7.1
      node_modules/@commitlint/cli
        @commitlint/cli@"^17.7.1" from commitlint@17.7.1
        node_modules/commitlint
          dev commitlint@"^17.7.1" from repro-subpackage@undefined
          packages/repro-subpackage
            repro-subpackage@undefined
            node_modules/repro-subpackage
              workspace packages/repro-subpackage from the root project
  peer typescript@">=2.7" from ts-node@10.9.1
  node_modules/ts-node
    peer ts-node@">=10" from cosmiconfig-typescript-loader@4.3.0
    node_modules/cosmiconfig-typescript-loader
      cosmiconfig-typescript-loader@"^4.0.0" from @commitlint/load@17.7.1
      node_modules/@commitlint/load
        @commitlint/load@"^17.7.1" from @commitlint/cli@17.7.1
        node_modules/@commitlint/cli
          @commitlint/cli@"^17.7.1" from commitlint@17.7.1
          node_modules/commitlint
            dev commitlint@"^17.7.1" from repro-subpackage@undefined
            packages/repro-subpackage
              repro-subpackage@undefined
              node_modules/repro-subpackage
                workspace packages/repro-subpackage from the root project
    ts-node@"^10.8.1" from @commitlint/load@17.7.1
    node_modules/@commitlint/load
      @commitlint/load@"^17.7.1" from @commitlint/cli@17.7.1
      node_modules/@commitlint/cli
        @commitlint/cli@"^17.7.1" from commitlint@17.7.1
        node_modules/commitlint
          dev commitlint@"^17.7.1" from repro-subpackage@undefined
          packages/repro-subpackage
            repro-subpackage@undefined
            node_modules/repro-subpackage
              workspace packages/repro-subpackage from the root project
  typescript@"^4.6.4 || ^5.0.0" from @commitlint/load@17.7.1
  node_modules/@commitlint/load
    @commitlint/load@"^17.7.1" from @commitlint/cli@17.7.1
    node_modules/@commitlint/cli
      @commitlint/cli@"^17.7.1" from commitlint@17.7.1
      node_modules/commitlint
        dev commitlint@"^17.7.1" from repro-subpackage@undefined
        packages/repro-subpackage
          repro-subpackage@undefined
          node_modules/repro-subpackage
            workspace packages/repro-subpackage from the root project
```

Run `npm run commitlint` in the main branch of this repo. It should fail with `Error: Cannot find module 'typescript’`. The `in-root` branch moves the 2 commitlint dependencies to the top level, removes them from the `packages/repro-subpackage` and updates the lock. Running `npm run commitlint` there should work without issue.

Issue report [here](https://github.com/conventional-changelog/commitlint/issues/3665).
