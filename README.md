In general app uses [React](https://react.dev) as a UI library, [Chakra UI](https://chakra-ui.com/) as
UI-Kit, [React-query](https://tanstack.com/query/latest/docs/react/installation) to manage api requests and
data, [zod](https://github.com/colinhacks/zod) to validate and type data.

User need to select target repository with Owner and Repo inputs on the main page, then user can select individual
commit from commits list table. Then user will be redirected to the Commit View page. Selected commit sha is used there
to request individual commit information.

### Install

Install dependencies.

```bash
npm install
```

To connect to the API, you need to create a .env file in the root directory of the project and add an environment variable. This variable should be a [GitHub API token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token), named as specified in the .env.example file.

### Serve with hot reload at <http://localhost:5173>.

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

View and interact with tests via UI.

```bash
npm run test:ui
```
