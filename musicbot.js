const Discord = require('discord.js'); require('discord-reply');
const fs = require("fs");
const client = new Discord.Client();
const prefix = '.';
const jsonlocation = 'songlist.json';

function PUSH(FileLocation, Data, Path)
{
    if (Path === undefined)
    {
        const data = JSON.parse(fs.readFileSync(FileLocation).toString());

        data.push(Data);

        fs.writeFileSync(FileLocation, JSON.stringify(data, null, 2));
    }
    else
    {
        const data = JSON.parse(fs.readFileSync(FileLocation).toString());

        data[Path].push(Data);

        fs.writeFileSync(FileLocation, JSON.stringify(data, null, 2));
    }
};

client.once('ready' , () =>
{
    console.log("bot is online");
});

client.on
('message', message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command == '' || command.includes('?')) return;

    else if (command == 'baa')
    {
        let category = args [0];
        let all = args [1];

        const data = fs.readFileSync(jsonlocation);
        const other_json = JSON.parse(data);

        if (category)
        {
            if (!isNaN(category))
            {
                const category_number = parseInt(category);

                if (category_number > 0)
                {
                    if (8 > category_number)
                    {
                        if (all)
                        {
                            if (all == 'all') { message.lineReply(other_json[category_number]); }

                            else if (all == 'add')
                            {
                                message.lineReplyNoMention('Type down the song which you want to add it to ' + other_json[category_number][0] + '');

                                const filter = (m) => m.author.id === message.author.id;
                                const collector = new Discord.MessageCollector(message.channel, filter, {time: 1000 * 30});

                                collector.on('collect', (song) =>
                                {
                                    collector.stop();

                                    song.react('👍');

                                    PUSH(jsonlocation, song.content, category_number);

                                    const response = new Discord.MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('Your response was added !')
                                    .setDescription('' + song.content + ' has been sucessfully added to ' + other_json[category_number][0] + '' + "'" + 's list');

                                    message.channel.startTyping(); setTimeout(() => { message.channel.stopTyping(); song.lineReply(response); }, 1000 * 1);
                                });
                            }
                        }

                        else
                        {
                            const random_number = parseInt(math.random(3, other_json[category_number].length));

                            const random_song = other_json[category_number][random_number];

                            message.lineReply(random_song);
                        }
                    }
                }
            }
        }

        else { message.lineReplyNoMention(other_json.category); }
    }

    else if (command == 'joke') { message.lineReply('you'); }


});
client.login('ODc2NzcyMjI3NzM4MTA3OTQ0.YRo7xA.9rA_Mw7QESRsEg1RnEyL8r69_D8');