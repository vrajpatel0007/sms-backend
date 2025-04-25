const Notification = require("../sockets/notification");
const ComplaintService = require("../services/Complaint.service.js");

const createComplaint = async (req, res) => {
  try {
    const { complainername, complaintname, description, wing, unit, priority, status } = req.body;

    // Validate that all required fields are provided
    if (!complainername || !complaintname || !description || !wing || !unit || !priority || !status) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Prepare complaint data
    const complaintData = {
      Complainer_Name: complainername,
      Complaint_Name: complaintname,
      Description: description,
      Wing: wing,
      Unit: unit,
      Priority: priority,
      Status: status,  // Ensure status is valid (Open, Pending, Solved)
      createdBy: req.user._id,  // Assuming req.user is the authenticated user
      Society: req.user.societyid,  // Assuming req.user contains society information
    };

    // Use service to create a new complaint
    const complaint = await ComplaintService.create(complaintData);

    // Send notification to the assigned recipient (e.g., admin or relevant person)
    const notificationResponse = await Notification.sendNotification({
      recipientId: req.user._id,  // Assuming the logged-in user should be notified (modify accordingly)
      message: `You have a new complaint: ${complaint.Complaint_Name}`,
      type: "Complaint",  // Type can be dynamic if needed
    });

    // Check if the notification was sent successfully
    if (!notificationResponse.success) {
      console.error("❌ Failed to send notification");
    }

    // Return response with created complaint and notification status
    return res.status(201).json({
      message: "Complaint created successfully",
      complaint,
      notification: notificationResponse.success ? "Notification sent" : "Failed to send notification",
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await ComplaintService.getAll(req.user.societyid); // Assuming society ID is available in `req.user`
    return res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await ComplaintService.getById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    return res.status(200).json(complaint);
  } catch (error) {
    console.error("Error fetching complaint:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const complaint = await ComplaintService.update(req.params.id, req.body);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    return res.status(200).json({ message: "Complaint updated successfully", complaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    return res.status(500).json({ message: error.message });
  }
};

const removeComplaint = async (req, res) => {
  try {
    const complaint = await ComplaintService.remove(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    return res.status(200).json({ message: "Complaint removed successfully" });
  } catch (error) {
    console.error("Error removing complaint:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  removeComplaint,
};
