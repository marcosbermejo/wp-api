module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name: 'wp-api',
      script: 'dist/src/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '100M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user: 'ubuntu',
      host: '176.34.210.246',
      ref: 'origin/main',
      repo: 'git@github.com:marcosbermejo/wp-api.git',
      path: '/var/www/html/wp-api',
      key: '/home/marcos/ana.pem',
      ssh_options: ['ForwardAgent=yes'],
      'pre-deploy-local': `scp -i /home/marcos/ana.pem .env ubuntu@176.34.210.246:/var/www/html/wp-api/source`,
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    },
    staging: {},
    dev : {}
  }
};