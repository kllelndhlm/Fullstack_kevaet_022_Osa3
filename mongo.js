const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://puhluet:<password>@cluster0.2wtbn.mongodb.net/puhluetteloDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const nameSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Name = mongoose.model('Name', nameSchema)

if(process.argv.length === 3) {
  console.log("phonebook: ")
  Name.find({}).then(result => {
      result.forEach(name => {
          console.log(name.name, name.number)
      })
      mongoose.connection.close()
  })
} else {
  const name = new Name({
    name: process.argv[3],
    number: process.argv[4]
  })

  name.save().then(result => {
    console.log('added',  result.name, 'number', result.number, 'to the phonebook')
    mongoose.connection.close()
  })
}