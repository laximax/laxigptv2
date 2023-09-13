const {StringSelectMenuBuilder, StringSelectMenuOptionBuilder,ActionRowBuilder,ComponentType,} = require ('discord.js');

const data = {
    name: 'help-menu',
    description: 'Help Menu Center',
};

async function run ({ interaction }) {
    const pets = [
        {
            label: 'Community Commands',
            description: 'Topluluk Komutları.',
            value: 'Topluluk Komutlari:',
            emoji: '🥸'
        },
        {
            label: 'AI Commands',
            description: 'AI Komutları.',
            value: 'AI Komutları',
            emoji:'🤖'
        },
    ];

     const selectMenu = new StringSelectMenuBuilder()
     .setCustomId(interaction.id)
     .setPlaceholder('Bir seçim yapın!')
     .setMinValues(0)
     .setMaxValues(1)
     .addOptions(
        pets.map((pet) => 
        new StringSelectMenuOptionBuilder()
        .setLabel(pet.label)
        .setDescription(pet.description)
        .setValue(pet.value)
        .setEmoji(pet.emoji)
        )
        
        );
       const actionRow = new ActionRowBuilder().addComponents(selectMenu);
       const reply = await interaction.reply({components: [actionRow]});

       const collector = reply.createMessageComponentCollector({
        ComponentType: ComponentType.StringSelect,
        filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
        time: 60_000,
       });

       collector.on('collect',(interaction) => {
        if(!interaction.values.length) {
            interaction.reply('Lütfen bir seçim yapın.');
            return;
        }
        interaction.reply(
            `Sunu sectiniz/${interaction.values.join(',')}`
            
        )
       });
};

module.exports = { data,run};