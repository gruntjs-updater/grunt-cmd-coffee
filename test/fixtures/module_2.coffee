define (require, exports, module)->
  moduleKeywords = ['extended', 'included']

  class Module
    @extend: (obj) ->
      for key, value of obj when key not in moduleKeywords
        @[key] = value

      obj.extended?.apply(@)
      this

    @include: (obj) ->
      for key, value of obj when key not in moduleKeywords
        # Assign properties to the prototype
        @::[key] = value

      obj.included?.apply(@)
      this

  ORM = 
    find: (id) ->
      console.log 'find fn'
    create: (attrs) ->
    extended: ->
      @include
        save: -> 

  class User extends Module
    @extend ORM