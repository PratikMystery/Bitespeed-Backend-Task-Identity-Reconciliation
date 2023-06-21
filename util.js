const { Sequelize, Op } = require("sequelize");
const Contact = require("./contact");
Contact.sync({ force: true });

class Util {
    // fetching all contacts
    async fetchAllContacts() {
        try {
            const contacts = await Contact.findAll();
            return contacts;
        } catch (err) {
            console.log("Error fetching contacts");
            throw err;
        }
    }

    // fetching contact based on the filter in data
    // data : {email: "abc@.."} or {phoneNumber: "123.."}
    async fetchMatchingContact(data) {
        const key = Object.keys(data)[0];
        const val = data[key];
        if (val === null) return [];
        try {
            const contact = await Contact.findAll({
                limit: 1,
                where: data,
                order: [["updatedAt", "ASC"]],
            });
            return contact;
        } catch (err) {
            console.log("Error fetching contact");
            throw err;
        }
    }

    // Here we change a primary to secondary
    // We also update all the contacts that are linked to the old pcid
    async updateContactDetails(new_pcid, old_pcid) {
        try {
            await Contact.update(
                {
                    linkedId: new_pcid,
                    linkPrecedence: "secondary",
                    updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                { where: { id: old_pcid } }
            );
            await Contact.update(
                {
                    linkedId: new_pcid,
                    updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                { where: { linkedId: old_pcid } }
            );
        } catch (err) {
            console.log("Error updating contact details");
            throw err;
        }
    }

    getPrimaryContactId(contact) {
        if (contact.linkPrecedence === "secondary") return contact.linkedId;
        return contact.id;
    }

    async handleRequest(email, phoneNumber) {
        try {
            const eMatch = await this.fetchMatchingContact({ email: email });
            const pMatch = await this.fetchMatchingContact({
                phoneNumber: phoneNumber,
            });
            // No matches found
            // New data for db
            if (eMatch.length === 0 && pMatch.length === 0) {
                const contact = await Contact.create({
                    phoneNumber: phoneNumber,
                    email: email,
                    linkPrecedence: "primary",
                }).catch((err) => {
                    console.error("Error creating contact");
                    throw err;
                });
                console.log("Contact created:", contact);
                const pcid = this.getPrimaryContactId(contact);
                return pcid;
            }
            // No email match found
            if (eMatch.length === 0) {
                const pcid = this.getPrimaryContactId(pMatch[0]);
                // New data for db
                if (email !== null) {
                    const contact = await Contact.create({
                        phoneNumber: phoneNumber,
                        email: email,
                        linkedId: pcid,
                        linkPrecedence: "secondary",
                    }).catch((err) => {
                        console.error("Error creating contact");
                        throw err;
                    });
                    console.log("Contact created:", contact);
                }
                return pcid;
            }
            // No phone match found
            if (pMatch.length === 0) {
                const pcid = this.getPrimaryContactId(eMatch[0]);
                // New data for db
                if (phoneNumber !== null) {
                    const contact = await Contact.create({
                        phoneNumber: phoneNumber,
                        email: email,
                        linkedId: pcid,
                        linkPrecedence: "secondary",
                    }).catch((err) => {
                        console.error("Error creating contact");
                        throw err;
                    });
                    console.log("Contact created:", contact);
                }
                return pcid;
            }
            // Here we are considering the case where we can have
            // two different primary contacts
            let pcid1 = this.getPrimaryContactId(eMatch[0]);
            let pcid2 = this.getPrimaryContactId(pMatch[0]);
            // here we have a complete match, no updates
            if (pcid1 === pcid2) {
                return pcid1;
            }
            if (pcid1 > pcid2) {
                [pcid1, pcid2] = [pcid2, pcid1];
            }
            await this.updateContactDetails(pcid1, pcid2);
            return pcid1;
        } catch (err) {
            console.log(
                `Error handling request email:${email} phoneNumber:${phoneNumber}`
            );
            throw err;
        }
    }

    async generateResponse(id) {
        try {
            const contacts = await Contact.findAll({
                where: {
                    [Op.or]: [{ id: id }, { linkedId: id }],
                },
                order: [["updatedAt", "ASC"]],
            });
            const ids = contacts.map((contact) => contact.id);
            const emails = contacts.map((contact) => contact.email);
            const phoneNumbers = contacts.map((contact) => contact.phoneNumber);
            const res = {
                contact: {
                    primaryContatctId: ids.shift(),
                    emails: emails,
                    phoneNumbers: phoneNumbers,
                    secondaryContactIds: ids,
                },
            };
            return res;
        } catch (err) {
            console.log("Error generating response for id:", id);
            throw err;
        }
    }
}

module.exports = Util;
