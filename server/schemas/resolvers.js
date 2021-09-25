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
             let load = await Load.find({})
            console.log("all loads is :", load)
             return load
          },
          me: async (parent, args, context) => {
            userId = context.user
            console.log("user id in resolvers is :", userId)
            const checkTruck = await Trucking_User.findById(  userId  )
            console.log("check Truck is:", checkTruck)
            const checkDock = await Dock_User.findById( userId)
            console.log("check Dock is:", checkDock)
            let docker, trucker
            if (checkTruck) {
              trucker = true
            } else {
              trucker = false
            }
            if (checkDock) {
              docker = true
            } else {
              docker = false
            }
            // if (checkTruck) {
            //   return true
            // } else return false
            return {docker,trucker}
          },   
          trucker_Id : async (parent, args, context) => {
            let truck = context.user._id
            console.log("trucker id is :", truck)
          return {truck}
          },
          getLoad: async (parent, args, context) => {
            // let loadIs = args.TheLoad
          //  let TheLoad =  await Load.findById( args.this)
            // console.log("the load is:", loadIs)
            return await Load.findById(args.this)
          },
          getTruckerLoads: async (parent, args, context) => {
            console.log("context user for get trucker loads is:", context.user)
            let test =  await Trucking_User.findById(context.user._id)
            console.log("trucking user data is:", test)

            return test.loads
          },
          // loadsInAState : async (parent, args, context) => {
          //   console.log("hello")
          //   let state_US = args.state
          //   let allLoads =  await Load.find({})
          //   console.log("all loads length is:", allLoads)
          //   let us_State_Array = [["Alabama", "AL"],["Alaska", "AK"],["Arizona", "AZ"],
          //   ["Arkansas", "AR"],["California", "CA"],["Colorado", "CO"],["Connecticut", "CT"],
          //   ["Delaware", "DE"],["Florida", "FL"],["Georgia", "GA"],["Hawaii", "HI"],
          //   ["Idaho", "ID"],["Illinois", "IL"],["Indiana", "IN"],["Iowa", "IA"],
          //   ["Kansas", "KS"],["Kentucky", "KY"],["Louisiana", "LA"],["Maine", "ME"],
          //   ["Maryland", "MD"],["Massachusetts", "MA"],["Michigan", "MI"],["Minnesota", "MN"]
          //   ,["Mississippi", "MS"],["Missouri", "MO"],["Montana", "MT"],["Nebraska", "NE"],["Nevada", "NV"]
          //   ,["New Hampshire", "NH"],["New Jersey", "NJ"],["New Mexico", "NM"],["New York", "NY"],["North Carolina", "NC"],
          //   ,["North Dakota", "ND"],["Ohio", "OH"],["Oklahoma", "OK"],["Oregon", "OR"],["Pennsylvania", "PA"]
          //   ,["Rhode Island", "RI"],["South Carolina", "SC"],["South Dakota", "SD"],["Tennessee", "TN"],["Texas", "TX"],["Utah", "UT"]
          //   ,["Vermont", "VT"],["Virginia", "VA"],["Washington", "WA"],["West Virginia", "WV"],["Wisconsin", "WI"]
          //   ,["Wyoming", "WY"]]
          //     let newStateArray = []
          //   for ( let i = 0 ; i < allLoads.length; i ++ ) {
          //     if (allLoads[i].state === state_US) {
          //         newStateArray.push(allLoads[i].state)
          //     }
          //   }
          //   console.log("new state array is:", newStateArray)

          // }
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
            console.log("context from load is:", context.user._id)
            console.log("load one is again:", loadOne)
            // await Dock_User.findByIdAndUpdate(
            //   {_id: args.dock},
            //   { $addToSet: {loads: {_id: loadOne._id}}},
            //   {new: true, upsert: true}
            // // }
            // )

            await Trucking_User.findByIdAndUpdate(
              {_id: context.user._id},
              { $addToSet: { loads: {_id: loadOne._id}}},
              {new: true, upsert: true}
            )
            // const token = signToken(dockUser);
      
            return { _id: loadOne._id };
          },
          updateLoad: async (parent, args, context) => {
            console.log("update load context user is :", context.user)
            // if (context.user) {
              await Load.findByIdAndUpdate({_id: args.LoadId},args, { new: true });
            // }
            return {_id: args.LoadId}
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
          },
      
    }

}

module.exports = resolvers;