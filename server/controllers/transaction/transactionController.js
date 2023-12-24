const Transaction = require("../../models/transaction");
const Book = require("../../models/book")

module.exports = {
    addTranscation : async(req, res) => {
        try{
            const {userId, bookId, dueDate} = req.body;
            if (!userId || !bookId || !dueDate)
                return res.status(400).json({msg : "Not all fields have been provided"});

            const newTransaction = {
                userId : userId,
                bookId : bookId,
                rentalDate : new Date(),
                dueDate : dueDate,
            }

            const transaction = await Transaction.create(newTransaction);
            console.log(transaction);

            const book = await Book.findOne({_id : bookId});
            if(transaction){
                if(book.availableCopies < 1){
                    return res.status(404).json({msg : "No copies of this book is left in the store."});
                } else {
                    Book.findByIdAndUpdate(
                        bookId,
                        { $inc: { availableCopies: -1 } }, // Decrement availableCopies by 1
                        { new: true },
                        )
                        .then( (updatedBook) => console.log('Updated book after rental:', updatedBook))
                        .catch( (err) => console.log(err));         
                }
            }
            return res.status(201).send(transaction);

        }catch (err) {
            console.log(err.message);
            res.status(501).send({msg : err.message});
        }
    },
    getAllTransaction : async (req, res) => {
        try{
            const transactions = await Transaction.find({});
            return res.status(200).json({count : transactions.length, data : transactions});

        }catch (err){
            console.log(err.message);
            res.status(500).send({msg : err.message});
        }
    },
    getTransactionByTransactionId : async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await Transaction.find({_id : id});
            
            if(!transaction)
                return res.status(400).json({msg : "No transaction has been made"})
            return res.status(200).json({count : transaction.length, data : transaction});

        }catch (err) {
            console.log(err.message);
            res.status(500).send({msg : err.message});
        }
    },
    getTransactionByUserId : async (req, res) => {
        try {
            const { id } = req.params;
            const userTransaction = await Transaction.find({userId : id});
            
            if(!userTransaction)
                return res.status(400).json({msg : "No transaction has been made"})
            return res.status(200).json({count : userTransaction.length, data : userTransaction});

        }catch (err) {
            console.log(err.message);
            res.status(500).send({msg : err.message});
        }
    },
    bookReturned : async (req, res) => {
        try {
            const { bookId, userId, dueDate } = req.body;
          
            const result = await Transaction.findOneAndDelete({ userId: userId, bookId: bookId });     
            console.log(result);

            //Add 1 to availableCopies
            if(result){
                Book.findByIdAndUpdate(
                    bookId,
                    { $inc: { availableCopies: +1 } }, // Increment availableCopies by 1
                    { new: true },
                    )
                    .then( (updatedBook) => console.log('Updated book after rental:', updatedBook))
                    .catch( (err) => console.log(err));        
            }
            
            if(!result)
              return res.status(404).json({msg : "Transaction not found"});

            //Calculate the total fee of book rented  
            const book = await Book.findOne({_id : bookId});
            const bookDueDate = new Date(new Date().setDate(new Date().getDate() + dueDate));
            const currentTime = new Date();
           
            if( currentTime > bookDueDate ){
                //Time difference between Due date and actuall book return date
                const timeDifferenceInMillis = currentTime - bookDueDate;
                const timeDifferenceInDays = timeDifferenceInMillis / (1000 * 60 * 60 * 24);
                console.log(timeDifferenceInDays)

                const fee = book.rentalFee;
                const lateFee = timeDifferenceInDays * 2; 
                const totalFee = fee + lateFee;

                return res.status(200).json({msg : "Transaction deleted", fee , lateFee, totalFee})
            } else{
                const fee = book.rentalFee;
                return res.status(200).json({msg : "Transaction deleted", data : "Fee", fee})
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({msg : err.message});
        }
    }
}