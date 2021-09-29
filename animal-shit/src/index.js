import {webpackModules} from "@cumcord/modules";
import {patcher} from "@cumcord"

let unpatch;

export default (data) => {
    return {
      async onLoad() {
        unpatch = patcher.instead("sendMessage", webpackModules.findByProps("sendMessage"), async(args, orig) => {

          // get some variables
          const store = data.persist.store;
          const content = args[1].content
          // prefix shit
          if (!store.hasOwnProperty('prefix')) store.prefix = '?'
          const prefix = store.prefix
          // setting new content
          function setContent(newContent) {
            args[1].content = newContent
          }
          console.log(args);

          // the prefix
          if (!content.startsWith(prefix)) return orig(...args);

          // get some more vaiables
          const command = content.split(' ')[0].replace(prefix, '')
          const messageArgs = content.replace((prefix + command), '').trim().split(' ')

          // commands
          switch (command) {
            case 'setprefix':
              if (messageArgs.length !== 1) {
                setContent('No spaces allowed')
                break;
              }
              store.prefix = messageArgs[0]
              setContent(`Set the prefix to ${messageArgs[0]}`)
              break;
            // sub commands
            case 'animal':
              if (messageArgs < 2) {
                setContent('Please choose between the subcommands: `fact` and `animal`')
                break;
              };
              const messageSubArgs = messageArgs.slice(1)
              const subCommand = messageArgs[0]
              const furries = ['fox', 'dog', 'panda', 'koala', 'cat', 'creatable']
              if (!furries.includes(messageSubArgs[0]?.toLowerCase())) break;
              if (messageSubArgs[0] == 'creatable') {
                setContent('I just got cummed on by Creatable')
                break;
              }

              switch (subCommand) {
                case 'fact':
                  let fact = await fetch(`https://some-random-api.ml/facts/${messageSubArgs[0].toLowerCase()}`).then((res)=>res.json())
                  fact = fact.fact
                  setContent(fact)
                  break;
                case 'image':
                  let image = await fetch(`https://some-random-api.ml/img/${messageSubArgs[0].toLowerCase()}`).then((res)=>res.json())
                  image = image.link
                  setContent(image)
                  break;
                default:
                  setContent('That\'s not even a option, what are you doing?')
                  break; 
              }
              break;
          }
          return orig(...args)
        });
      },
      onUnload() {
        unpatch();
      }
    }
}