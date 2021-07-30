const { AuthenticationError } = require('apollo-server-express');
const { Trucking_User, Dock_User, Load } = require('../models');
const { findById } = require('../models/Dock_User');
const { signTokenTrucker, signTokenDock } = require('../utils/auth');

const resolvers = {

    Query: {
        truckingUser: async (parent, args, context) => {
            if (context.user) {
              const truckingUser = await Trucking_User.findById(context.user._id)
              // .populate({
              //   path: 'orders.products',
              //   populate: 'category'
              // });
      
            //   truckingUser.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return truckingUser;
            }
      
            throw new AuthenticationError('Not logged in');
          },
          dockUser: async (parent, args, context) => {
            if (context.user) {
              const dockUser = await Dock_User.findById(context.user._id)
              // .populate({
              //   path: 'orders.products',
              //   populate: 'category'
              // });
      
            //   truckingUser.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return dockUser;
            }
      
            throw new AuthenticationError('Not logged in');
          },
          dockUsers: async () => {
            return await Dock_User.find({})
          },
          truckingUsers: async () => {
            return await Trucking_User.find({})
          },
          loads: async () => {
            return await Load.find({})
          }
    },
    Mutation: {
        addTruckingUser: async (parent, args) => {
            const truckingUser = await Trucking_User.create(args);
            const token = signTokenTrucker(truckingUser);
      
            return { token, truckingUser };
          },
          addDockUser: async (parent, args) => {
            const dockUser = await Dock_User.create(args);
            const token = signTokenDock(dockUser);
      
            return { token, dockUser };
          },
          addLoad: async (parent, args, context) => {
            // console.log("context is :", context)
            const loadOne = await Load.create(args);
            // console.log("load one is:", loadOne)
            // let loadAdded =   await Load.findById()
            console.log("load one is again:", loadOne)
            await Dock_User.findByIdAndUpdate(
              {_id: args.dock},
              { $addToSet: {loads: {_id: loadOne._id}}},
              {new: true, upsert: true}
            // }
            )

            await Trucking_User.findByIdAndUpdate(
              {_id: args.trucker},
              { $addToSet: { loads: {_id: loadOne._id}}},
              {new: true, upsert: true}
            )
            // const token = signToken(dockUser);
      
            // return { load };
          },
          addLoadToDock: async (parent, args, context) => {
            if (context.user) {
              console.log("context.user is:", context.user )
              console.log("args is :", args.loadAdded)
              return await Dock_User.findByIdAndUpdate(context.user,  { $addToSet: {loads: {_id: args.loadAdded}}},   {new: true, upsert: true} )
            }
          
          },
          addLoadToTrucker: async (parent, args, context) => {
            if (context.user) {
              console.log("context.user is:", context.user )
              console.log("args is :", args.loadAdded)
              return await Trucking_User.findByIdAndUpdate(context.user,  { $addToSet: {loads: {_id: args.loadAdded}}} )
            }
          
          },
          removeLoadTrucker: async (parent, args, context) => {
            console.log("context is :", context.user._id)
            if (context.user) {
              console.log("load removed is :", args.loadRemoved)
              let load1 = Load.findById(args.loadRemoved)
              return await Trucking_User.findByIdAndUpdate(context.user._id, { $pull: {loads: {_id: load1._id}}, new: true, upsert: true})
            }
          },
          truckingLogin: async (parent, { userName, password }) => {
            const user = await Trucking_User.findOne( { userName } );
            console.log("user is :", user)
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            console.log("password is :", password)
            const correctPw = await user.isCorrectPassword(password);
            console.log("correct pw is:", correctPw)
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signTokenTrucker(user);
            console.log("token is now:", token)
            return { token, user };
          },
          dockLogin: async (parent, { name, password }) => {
            const user = await Dock_User.findOne( { name } );
            console.log("user is :", user)
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            console.log("password is :", password)
            const correctPw = await user.isCorrectPassword(password);
            console.log("correct pw is:", correctPw)
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signTokenDock(user);
            console.log("token is now:", token)
            return { token, user };
          }          
    }

}

module.exports = resolvers;