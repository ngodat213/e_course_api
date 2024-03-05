const mongoose = require('mongoose');
const Contact = require('../models/contact_model');

// Controller
exports.contact_create = (req, res, next) => {
    const { fullName, mail, text, topic } = req.body;
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        mail,
        text,
        topic
    });
    contact.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Contact created successfully",
            createdContact: {
                _id: result._id,
                fullName: result.fullName,
                mail: result.mail,
                text: result.text,
                topic: result.topic,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/contact/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.contact_get_all = (req, res, next) => {
    Contact.find()
    .exec()
    .then(contacts => {
        res.status(200).json({
            count: contacts.length,
            contacts: contacts.map(contact => {
                return {
                    _id: contact._id,
                    fullName: contact.fullName,
                    mail: contact.mail,
                    text: contact.text,
                    topic: contact.topic,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/contact/' + contact._id
                    }
                }
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.contact_get_by_id = (req, res, next) => {
    const id = req.params.contactId;
    Contact.findById(id)
        .exec()
        .then(contact => {
            if (contact) {
                res.status(200).json({
                    contact: contact,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/contact'
                    }
                });
            } else {
                res.status(404).json({ message: 'Contact not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.contact_update = (req, res, next) => {
    const id = req.params.contactId;
    const updateOps = {};
    
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Contact.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Contact updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/contact/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.contact_delete = (req, res, next) => {
    const id = req.params.contactId;
    Contact.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Contact deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/contact',
                    body: { fullName: 'String', mail: 'String', text: 'String', topic: 'String' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
