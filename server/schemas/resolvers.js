const { AuthenticationError } = require('apollo-server-express');
const { Trucking_User, Dock_User, Load, User } = require('../models');
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
          addLoad: async (parent, args) => {
            const load = await Load.create(args);

            // const token = signToken(dockUser);
      
            return { load };
          },
          addLoadToDock: async (parent, args, context) => {
            if (context.user) {
              console.log("context.user is:", context.user )
              console.log("args is :", args.loadAdded)
              return await Dock_User.findByIdAndUpdate(context.user,  { $addToSet: {loads: {_id: args.loadAdded}}} )
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
            console.log("context is :", context.user)
            if (context.user) {
              console.log("load removed is :", args.loadRemoved)
              return await Trucking_User.findByIdAndUpdate(context.user, { $pull: {loads: {_id: args.loadRemoved}}, new: true})
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
            
            return { token, user };
          }     
    }

}

module.exports = resolvers;