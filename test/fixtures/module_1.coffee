define (require, exports, module)->
  class Animal
    price: 5

    sell: =>
      alert "Give me #{@price} shillings!"

  module.exports = Animal