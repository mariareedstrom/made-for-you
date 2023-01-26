# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "🌱 Seeding your gifts..."

#clean-up before seeding
GiftRecipient.destroy_all
Item.destroy_all
Gift.destroy_all
Recipient.destroy_all
Member.destroy_all

#creating members
martha = Member.create(name: "Martha Stewart", email: "martha@email.com", password: "martha", about: "Homemaker extraordinaire. Self-made millionaire. Favorite color: orange.", links: "instagram/martha.com")
bertha = Member.create(name: "Bertha Bee", email: "bertha@email.com", password: "bertha", about: "Beekeeper. Honey gifter.", links: "instagram/beebertha.com")
joe = Member.create(name: "Joe Schmo", email: "joe@email.com", password: "joe", about: "Dabbling in homemade brews and liquors", links: "instagram/joes.com")
alice = Member.create(name: "Alice", email: "alice@email.com", password: "alice", about: "Novice gift maker, longtime giver.", links: "instagram/alice.com")

#creating gifts
g1 = Gift.create!(member_id: martha.id, name: "Peanut Popcorn Balls", description: "Caramel-coated peanut-popcorn balls. Wrap them in plain parchment and striped waxed paper for the full bon-bon effect.", difficulty: 4, picture_url:"http://bit.ly/3kcNGiE", type_of_gift:1)
g2 = Gift.create!(member_id: bertha.id, name: "Sriracha Honey", description: "Sweet honey with a sting. It's mmm mmm good. No, really.", difficulty: 3, picture_url: "http://bit.ly/3krgl3S", type_of_gift:1)
g3 = Gift.create!(member_id: joe.id, name: "Limonchello", description: "Sweet, lemon flavored liquor. Takes about 3 months to complete, but worth the wait.", difficulty: 4, picture_url:"http://bit.ly/3WDvWup", type_of_gift:2)
g4 = Gift.create!(member_id: alice.id, name: "Beer Bread", description: "An easy and delicious loaf of bread.Make with your favorite brew. Bake and gift ready made, og mix dry ingredients in a mason jar and gift alongside their favorite beer.", difficulty: 3, picture_url:"http://bit.ly/3kqpedF", type_of_gift:1)
g5 = Gift.create!(member_id: alice.id, name: "Handmade Headbands", description: "Great gift for your fashion savvy ladies. Easy to make and cute to wear.", difficulty: 2, picture_url:"http://bit.ly/3ZYTvAL", type_of_gift:0)
g6 = Gift.create!(member_id: martha.id, name: "Swicy Pickles", description: "These easy spicy pickles are great for snacking and will amp up any sandwich or charcuterie board. No canning equipment required!", difficulty: 3, picture_url:"http://bit.ly/3XSmvs3", type_of_gift:0)


#creating recipients
jane = Recipient.create(member_id: martha.id, name: "Aunt Jane", notes: "My favorite auntie Jane. She loves sweets and candy.")
bob = Recipient.create(member_id: bertha.id, name: "Bob Bobson", notes: "College buddy. Enjoys spirits and salty snacks.")
cindy = Recipient.create(member_id: joe.id, name: "Cindy Lou", notes: "BFF and sweetest person ever.")
dot = Recipient.create(member_id: alice.id, name: "Grandma Dot", notes: "Granny loves anything we make from the heart. Favorite color: purple.")
emily = Recipient.create(member_id: martha.id, name: "Emily Emmerson", notes: "Likes fashion and trendy things.")
greg = Recipient.create(member_id: bertha.id, name: "Greg Greggers", notes: "Sports and beer.")
allison = Recipient.create(member_id: joe.id, name: "Allison Allies", notes: "Nice neighbors. Gave us homemade liquor last Christmas!")
jim = Recipient.create(member_id: alice.id, name: "Jim Jimmy", notes: "BBQ champ. Makes great brisket.")
kim = Recipient.create(member_id: martha.id, name: "Kim Kimmy", notes: "Homemaker and good friend. Loves scents and florals.")
jenny = Recipient.create(member_id: bertha.id,name: "Jenny Block", notes: "Fun and trendy. Likes boardgames and mysteries.")
amy = Recipient.create(member_id: joe.id, name: "Amy", notes: "Cousin Amy. Loves chocolate and champagne.")
nick = Recipient.create(member_id: martha.id, name: "Nick N", notes: "allergic to peanuts and mangoes.")



#creating gift_recipients
gr1 = GiftRecipient.create(gift_id: g1.id, recipient_id: jane.id)
gr2 = GiftRecipient.create(gift_id: g2.id, recipient_id: bob.id)
gr3 = GiftRecipient.create(gift_id: g3.id, recipient_id: cindy.id)
gr4 = GiftRecipient.create(gift_id: g4.id, recipient_id: dot.id)
gr5 = GiftRecipient.create(gift_id: g5.id, recipient_id: emily.id)
gr6 = GiftRecipient.create(gift_id: g6.id, recipient_id: greg.id)
gr7 = GiftRecipient.create(gift_id: g1.id, recipient_id: allison.id)
gr8 = GiftRecipient.create(gift_id: g2.id, recipient_id: jim.id)
gr9 = GiftRecipient.create(gift_id: g3.id, recipient_id: kim.id)
gr10 = GiftRecipient.create(gift_id: g4.id, recipient_id: jenny.id)
gr11 = GiftRecipient.create(gift_id: g5.id, recipient_id: amy.id)
gr12 = GiftRecipient.create(gift_id: g1.id, recipient_id: nick.id)


#creating items
i1 = Item.create(gift_id: g1.id, name: "peanut butter", quantity: 2, unit: "tablespoons")
i2 = Item.create(gift_id: g1.id, name: "popcorn", quantity: 1, unit: "bag")
i3 = Item.create(gift_id: g1.id, name: "caramel syrup", quantity: 3, unit: "teaspoons")
i4 = Item.create(gift_id: g2.id, name: "minced garlic", quantity: 1, unit: "tablespoons")
i5 = Item.create(gift_id: g2.id, name: "olive oil", quantity: 1, unit: "teaspoons")
i6 = Item.create(gift_id: g2.id, name: "sriracha sauce", quantity: 4, unit: "tablespoons")
i7 = Item.create(gift_id: g2.id, name: "honey", quantity: 2, unit: "tablespoons")
i8 = Item.create(gift_id: g2.id, name: "soy sauce", quantity: 2, unit: "tablespoons")
i9 = Item.create(gift_id: g2.id, name: "rice vinegar", quantity: 1, unit: "tablespoon")
i10 = Item.create(gift_id: g2.id, name: "lemon juice", quantity: 1, unit: "teaspoon")
i11 = Item.create(gift_id: g3.id, name: "lemons", quantity: 10, unit: "whole")
i12 = Item.create(gift_id: g3.id, name: "vodka", quantity: 750 , unit: "ml")
i13 = Item.create(gift_id: g3.id, name: "sugar", quantity: 4, unit: "cups")
i14 = Item.create(gift_id: g4.id, name: "beer", quantity: 12, unit: "ounces")
i15 = Item.create(gift_id: g4.id, name: "flour", quantity: 3, unit: "cups")
i16 = Item.create(gift_id: g4.id, name: "sugar", quantity: 2, unit: "tablespoons")
i17 = Item.create(gift_id: g4.id, name: "baking soda", quantity: 2, unit: "teaspoons")
i18 = Item.create(gift_id: g4.id, name: "salt", quantity: 1, unit: "teaspoon")
i19 = Item.create(gift_id: g4.id, name: "melted butter", quantity: 4, unit: "tablespoons")
i20 = Item.create(gift_id: g5.id, name: "chosen fabric", quantity: 1, unit: "unit")
i20 = Item.create(gift_id: g5.id, name: "fusible interfacing", quantity: 1, unit: "package")
i21 = Item.create(gift_id: g5.id, name: "elastic band", quantity: 3, unit: "inches")
i22 = Item.create(gift_id: g6.id, name: "water", quantity: 2, unit: "cups")
i23 = Item.create(gift_id: g6.id, name: "white vinegar", quantity: 10, unit: "ounces")
i24 = Item.create(gift_id: g6.id, name: "sugar", quantity: 4, unit: "tablespoons")
i25 = Item.create(gift_id: g6.id, name: "kosher salt", quantity: 2, unit: "tablespoons")
i26 = Item.create(gift_id: g6.id, name: "dill", quantity: 2, unit: "sprigs")
i27 = Item.create(gift_id: g6.id, name: "garlic", quantity: 8, unit: "cloves")
i28 = Item.create(gift_id: g6.id, name: "red pepper flakes", quantity: 2, unit: "tablespoons")
i29 = Item.create(gift_id: g6.id, name: "pickling spices", quantity: 1, unit: "tablespoons")
i30 = Item.create(gift_id: g6.id, name: "pickling cucumbers", quantity: 3   , unit: "pounds")


puts "🌱Done Seeding 🌱"