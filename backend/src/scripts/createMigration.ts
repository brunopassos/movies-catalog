import { execSync } from 'child_process';

const migrationName = process.env.npm_config_name;

if (!migrationName) {
  console.error('Please provide a migration name using --name argument.');
  process.exit(1);
}

execSync(
  `npm run typeorm -- migration:create ./src/db/migrations/${migrationName}`,
  { stdio: 'inherit' },
);
