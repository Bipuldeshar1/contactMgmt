const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

//desc get all contacts
//route Get /api/contacts

const getContacts = asyncHandler(async (req,res) => {
    const contact =await Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
});

//desc create new contacts
//route POST /api/contacts
//@acess public
const createContact =asyncHandler( async (req,res) => {
   // console.log(req.body);
    const{name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
console.log(contact);
    res.status(201).json(contact);
});

//desc get  contacts
//route GET /api/contacts/:id

const getContact =asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);

});

//desc update contacts
//route POST /api/contacts/:id

const updateContact =asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update contact");
    }
  
    const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    );
    res.status(200).json(updatedcontact);
});

//desc delete contacts
//route POST /api/contacts/:id

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete contact");
    }
     await contact.deleteOne();
    res.status(200).json(contact);
});

module.exports = { getContacts,createContact,updateContact,getContact,deleteContact };