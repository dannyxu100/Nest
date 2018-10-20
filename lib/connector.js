const $             = global.$;
const mongoose      = $.require('mongoose');
const dbconfig      = $.require('/config/mongodb');


const Connector = {
    getURL() {
        let url = 'mongodb://';
        if (dbconfig.replicaSet && dbconfig.replicaSet.name) {        // 设置name值即可启用 replicaSet
            let members, membersURL, member;
            members = dbconfig.replicaSet.members;
            membersURL = [];
            for (member of members) {
                membersURL.push(`${member.host}:${member.port}`);
            }
            url += membersURL.join(',');
        } else {
            url += `${dbconfig.host}:${dbconfig.port}`;
        }
        if (dbconfig.dbname) {
            url += `/${dbconfig.dbname}`;
        }
        return url;
    },

    getOptions() {
        let options = {
            useCreateIndex: true,
            useNewUrlParser: true,
            poolSize: 5,                      // 连接池中维护的连接数
            reconnectTries: Number.MAX_VALUE,
            keepAlive: 120
        };

        if (dbconfig.user) {
            options.user = dbconfig.user;
        }
        if (dbconfig.pwd) {
            options.pass = dbconfig.pwd;
        }
        if (dbconfig.replicaSet && dbconfig.replicaSet.name) {
            options.replicaSet = dbconfig.replicaSet.name;
        }
        return options;
    },

    create() {
        let url, options;
        url = Connector.getURL();
        options = Connector.getOptions();

        $.msg('Database connect url: ' + url);
        mongoose.connect(url, options);
        mongoose.connection.on('connected', function (err) {
            if (err) {
                $.error('Database connection failure.');
            } else {
                $.msg('Mongodb connected.');
            }
        });

        mongoose.connection.on('error', function (err) {
            $.error('Mongoose connected error: ' + err);
        });

        mongoose.connection.on('disconnected', function () {
            $.error('Mongoose disconnected.');
        });

        /* process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                logger.info('Mongoose disconnected through app termination');
                process.exit(0);
            });
        }); */
    }
};

module.exports = Connector;
