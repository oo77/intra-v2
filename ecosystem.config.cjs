module.exports = {
    apps: [{
        name: 'intra-api',
        script: 'server/index.js',
        instances: 1,
        exec_mode: 'fork',
        watch: false,
        env: {
            NODE_ENV: 'development',
            PORT: 3001
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3001
        },
        // Логирование
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        time: true,
        // Авто-рестарт при падении
        autorestart: true,
        max_restarts: 10,
        restart_delay: 1000,
        // Graceful shutdown
        kill_timeout: 5000,
        wait_ready: true,
        listen_timeout: 10000
    }]
};
