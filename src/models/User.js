const database = require('../database/fakeData')

class User {
  constructor(userPayload) {
    this.userPayload = userPayload
  }

  static findAll(options) {
    const incrementViewedTimes = options?.incrementViewedTimes

    if (incrementViewedTimes) {
      database.forEach((user) => {
        this.incrementViewedTimes(user)
      })
    }

    return database
  }

  static findOne({ $key, $value }, options) {
    const incrementViewedTimes = options?.incrementViewedTimes

    const user = database.find((user) => {
      return user[$key] === $value
    })

    if (!user) {
      return
    }

    if (incrementViewedTimes) {
      this.incrementViewedTimes(user)
    }

    return user
  }

  static incrementViewedTimes(user) {
    user.viewedTimes = user.viewedTimes + 1
  }

  save() {
    const lastUser = database.at(-1)

    database.push({
      id: lastUser ? lastUser.id + 1 : 1,
      ...this.userPayload,
      viewedTimes: 0,
      allowedActions: [],
    })

    const { name } = this.userPayload

    const user = User.findOne({ $key: 'name', $value: name })

    return user
  }

  static delete(name) {
    const userIndex = database.findIndex((user) => user.name === name)
    database.splice(userIndex, 1)
  }

  static findOneAndUpdate({ $key, $value }, update) {
    const user = User.findOne({ $key, $value })

    if (!user) {
      return
    }

    Object.keys(update).forEach((key) => {
      user[key] = update[key]
    })

    return user
  }
}

module.exports = User
