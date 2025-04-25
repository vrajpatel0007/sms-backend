const express = require('express');
const router = express.Router();
const {authUser} = require('../middleware/auth');
const announcementController = require('../controllers/Announcement.controller');


router.post('/createAnnouncement', authUser, announcementController.createAnnouncement);
router.get('/getAllAnnouncements', authUser, announcementController.getAllAnnouncements);
router.get('/getAnnouncement/:id', authUser, announcementController.getAnnouncement);
router.put('/updateAnnouncement/:id', authUser,  announcementController.updateAnnouncement);
router.delete('/deleteAnnouncement/:id', authUser,  announcementController.deleteAnnouncement);

module.exports = router;