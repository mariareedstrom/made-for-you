# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "🌱 Seeding your gifts..."

#clean-up before seeding
Member.destroy_all
Gift.destroy_all
Recipient.destroy_all
GiftRecipient.destroy_all


#creating members
martha = Member.create(name: "Martha Stewart", email: "martha@email.com", password: "martha", about: "Homemaker extraordinaire. Self-made millionaire. Favorite color: orange.", links: "instagram/martha.com")
bertha = Member.create(name: "Bertha Bee", email: "bertha@email.com", password: "bertha", about: "Beekeeper. Honey gifter.", links: "instagram/beebertha.com")
joe = Member.create(name: "Joe Schmo", email: "joe@email.com", password: "joe", about: "Dabbling in homemade brews and liquors", links: "instagram/joes.com")
alice = Member.create(name: "Alice", email: "alice@email.com", password: "alice", about: "Novice gift maker, longtime giver.", links: "instagram/alice.com")

#creaing gifts
g1 = Gift.create(member_id: martha.id, name: "Peanut Popcorn Balls", description: "Caramel-coated peanut-popcorn balls. Wrap them in plain parchment and striped waxed paper for the full bon-bon effect.", difficulty: 4, picture_url:"http://bit.ly/3kcNGiE")
g2 = Gift.create(member_id: bertha.id, name: "Sriracha Honey", description: "Sweet honey with a sting.", difficulty: 3, picture_url: "http://bit.ly/3krgl3S")
g3 = Gift.create(member_id: joe.id, name: "Limonchello", description: "Sweet, lemon flavored liquor. Takes about 3 months to complete, but worth the wait.", difficulty: 4, picture_url:"http://bit.ly/3QN9ca2")
g4 = Gift.create(member_id: alice.id, name: "Beer Bread", description: "An easy and delicious loaf of bread.Make with your favorite brew. Bake and gift ready made, og mix dry ingredients in a mason jar and gift alongside their favorite beer.", difficulty: 3, picture_url:"http://bit.ly/3kqpedF")
g5 = Gift.create(member_id: alice.id, name: "Handmade Headbands", description: "Great gift for your fashion savvy ladies. Easy to make and cute to wear.", difficulty: 2, picture_url:"http://bit.ly/3XwNCbO")


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
gr1 = GiftRecipient.create(gift: g1, recipient: jane)
gr1 = GiftRecipient.create(gift: g2, recipient: bob)
gr3 = GiftRecipient.create(gift: g3, recipient: cindy)


puts "🌱Done Seeding 🌱"