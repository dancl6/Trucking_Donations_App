const { AuthenticationError } = require('apollo-server-express');
const { Trucking_User, Dock_User, Load } = require('../models');
const { signToken } = require('../utils/auth');

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
            const token = signToken(truckingUser);
      
            return { token, truckingUser };
          },
          addDockUser: async (parent, args) => {
            const dockUser = await Dock_User.create(args);
            const token = signToken(dockUser);
      
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
              return await Dock_User.findByIdAndUpdate(context.user,  {loads: {_id: args.loadAdded}} )
            }
          
          }
    }

}

module.exports = resolvers;