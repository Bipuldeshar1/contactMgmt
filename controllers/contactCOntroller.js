const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

//desc get all contacts
//route Get /api/contacts
//@acess public
const getContacts = asyncHandler(async (req,res) => {
    const contact =await Contact.find();
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
    });
console.log(contact);
    res.status(201).json(contact);
});

//desc get  contacts
//route GET /api/contacts/:id
//@acess public
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
//@acess public
const updateContact =asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
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
//@acess public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
     await contact.deleteOne();
    res.status(200).json(contact);
});

module.exports = { getContacts,createContact,updateContact,getContact,deleteContact };