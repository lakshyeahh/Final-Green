import Forum from '../models/forum.js';
import Post from '../models/post.js';
import encryptUserID from '../services/UrlService.js'; 
import sendEmail from '../services/EmailService.js';
import decryptUserID from '../services/Decrypt.js';

// List discussion forums
export const listForums = async (req, res) => {
  try {
    const forums = await Forum.find().populate('posts');
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forums', error });
  }
};

// Create a new forum
export const createForum = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newForum = new Forum({ title, description });
    await newForum.save();
    res.status(201).json(newForum);
  } catch (error) {
    res.status(500).json({ message: 'Error creating forum', error });
  }
};

// Get details of a specific forum
export const getForumDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const forum = await Forum.findById(id).populate({
      path: 'posts',
      populate: { path: 'userId', select: 'name' }
    });
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forum details', error });
  }
};

// Create a new post in a forum
 // Assuming your model file is named post.js

// Controller function to create a new post
export const createPost = async (req, res) => {
  const {
    userId, // This should be the encrypted user ID from the secret URL
    confessionTitle,
    confessionText,
    confessionCategory,
    confessionEmail,
    confessionAttachment
  } = req.body;

  try {
    // Decrypt the user ID from the URL
    // const decryptedUserId = decryptUserID(userId);

    // // Check if the decrypted user ID matches the current logged-in user's ID
    // if (decryptedUserId !== req.user._id.toString()) {
    //   return res.status(403).json({ message: 'Forbidden: User ID mismatch' });
    // }

    // Create a new Post instance
    const newPost = new Post({
      userId: req.user._id, // Use the current logged-in user's ID
      confessionTitle,
      confessionText,
      confessionCategory,
      confessionEmail,
      confessionAttachment
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res.status(201).json(savedPost); // Send back the saved post as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adjust the path as per your project structure

export const generateSecretURL = async (req, res) => {
  const {userId,userEmail}  = req.body; // Assuming req.user is populated by authentication middleware
   // Assuming req.user has an email field

  try {
    // Encrypt the user ID to generate the secret URL
    const url = encryptUserID(userId);
    const secretURL = `http://localhost:3000/create-post/${url}`
    console.log(secretURL)

    // Email content
    const text = `Congratulations on earning 500+ points on Green! 
    As a reward, you have earned the privilege to submit a secret confession. 
    Click the link below to submit your confession:`

    const html =` <body class="body" style="margin: 0; background-color: #e7c1b7; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
    <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Green</span></h3>
    </td>
    </tr>
    </tbody></table>
    </td>
    <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
    <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Sustainability</span></h3>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7; background-size: auto;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #02151c; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #303030;"><span> </span></td>
    </tr>
    </tbody></table>
    </div>
    </td>
    </tr>
    </tbody></table>
    <div class="spacer_block block-2" style="height:75px;line-height:75px;font-size:1px;"> </div>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 9px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 15.6px;"><span class="tinyMce-placeholder"></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 10px; padding-left: 5px; padding-right: 5px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 64px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 76.8px;"><span class="tinyMce-placeholder">The Green</span></h1>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h1 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 103px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 123.6px;"><span class="tinyMce-placeholder"><em>reward</em></span></h1>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:28px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:42px;">
    <p style="margin: 0; margin-bottom: 11px;">&nbsp;</p>
   
    <p style="margin: 0; margin-bottom: 11px;">&nbsp; &nbsp; ${text}</p>
    <p style="margin: 0;">&nbsp;</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    <div class="spacer_block block-9" style="height:110px;line-height:110px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #ffffff;  border-bottom: 30px solid #02151c; border-left: 30px solid #02151c; border-radius: 0; border-right: 30px solid #02151c; border-top: 30px solid #02151c; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 40px; padding-bottom: 10px; padding-left: 40px; padding-right: 40px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #000000; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 36px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 43.199999999999996px;"><span class="tinyMce-placeholder"><span style="background-color: #e7ff85;">&nbsp; 
     ${secretURL}&nbsp; </span></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #000000; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 40px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><span class="tinyMce-placeholder">&nbsp;<span style="background-color: #e7ff85;"> </span><br></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="color:#000000;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:25.5px;">&nbsp;</div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
    <p style="margin: 0;">Thank you for being a part of our sustainability community!</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;text-align:center;width:100%;">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder"><em>Best regards</em></span></h3>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
    <p style="margin: 0;">The Green Team</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    <!--[if !vml]><!-->
    <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
    <tbody><tr>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><!-- End -->
    
    </body>
    `;
    // Send the email
    await sendEmail(userEmail,text, html);
    res.status(200).json({ secretURL, message: 'Secret URL generated and emailed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendGiftVoucher = async (req, res) => {
  const { userId, userEmail } = req.body; // Assuming userId and userEmail are provided in the request body

  try {
    // Generate a unique gift voucher code or URL
    const voucherCode = generateUniqueVoucherCode(); // Replace with your function to generate voucher code/URL

    // Email content
    const text = `Congratulations on earning 1000+ points on Green! 
    You have earned a gift voucher as a reward. Use the voucher code below to claim your gift:
`;

    const html =` <body class="body" style="margin: 0; background-color: #e7c1b7; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
    <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Green</span></h3>
    </td>
    </tr>
    </tbody></table>
    </td>
    <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
    <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Sustainability</span></h3>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7; background-size: auto;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #02151c; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #303030;"><span> </span></td>
    </tr>
    </tbody></table>
    </div>
    </td>
    </tr>
    </tbody></table>
    <div class="spacer_block block-2" style="height:75px;line-height:75px;font-size:1px;"> </div>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 9px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 15.6px;"><span class="tinyMce-placeholder"></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 10px; padding-left: 5px; padding-right: 5px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 64px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 76.8px;"><span class="tinyMce-placeholder">The Green</span></h1>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h1 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 103px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 123.6px;"><span class="tinyMce-placeholder"><em>reward</em></span></h1>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:28px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:42px;">
    <p style="margin: 0; margin-bottom: 11px;">&nbsp;</p>

    <p style="margin: 0; margin-bottom: 11px;">&nbsp; &nbsp; ${text}</p>
    <p style="margin: 0;">&nbsp;</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    <div class="spacer_block block-9" style="height:110px;line-height:110px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #ffffff;  border-bottom: 30px solid #02151c; border-left: 30px solid #02151c; border-radius: 0; border-right: 30px solid #02151c; border-top: 30px solid #02151c; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 40px; padding-bottom: 10px; padding-left: 40px; padding-right: 40px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #000000; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 36px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 43.199999999999996px;"><span class="tinyMce-placeholder"><span style="background-color: #e7ff85;">&nbsp; 
     ${voucherCode}&nbsp; </span></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #000000; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 40px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><span class="tinyMce-placeholder">&nbsp;<span style="background-color: #e7ff85;"> </span><br></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="color:#000000;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:25.5px;">&nbsp;</div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
    <p style="margin: 0;">Thank you for being a part of our sustainability community!</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;text-align:center;width:100%;">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder"><em>Best regards</em></span></h3>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
    <p style="margin: 0;">The Green Team</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    <!--[if !vml]><!-->
    <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
    <tbody><tr>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><!-- End -->
    
    </body>
    `;


    // Send the email with gift voucher details
    await sendEmail(userEmail, text, html);

    res.status(200).json({ voucherCode, message: 'Gift voucher sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Replace this with your actual function to generate unique voucher code or URL
const generateUniqueVoucherCode = () => {
  // Replace with your logic to generate a unique voucher code or URL
  return 'ABC123'; // Example voucher code
};

export const sendMeetUpReward = async (req, res) => {
  const { userId, userEmail } = req.body; // Assuming userId, userEmail, location, and time are provided in the request body

  try {
    // Construct meet-up details
    const meetUpDetails = `Meet-up with seniors details:
    Location: Nescafe Tea-Point,
    Time: 5 oclock`;

    // Email content
    const text = `Congratulations on earning 2000+ points on Green! 
    You have earned a meet-up with seniors as a reward. Here are the details:
`;

    const html =` <body class="body" style="margin: 0; background-color: #e7c1b7; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
    <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Green</span></h3>
    </td>
    </tr>
    </tbody></table>
    </td>
    <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
    <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Sustainability</span></h3>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7; background-size: auto;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #02151c; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #303030;"><span> </span></td>
    </tr>
    </tbody></table>
    </div>
    </td>
    </tr>
    </tbody></table>
    <div class="spacer_block block-2" style="height:75px;line-height:75px;font-size:1px;"> </div>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 9px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 15.6px;"><span class="tinyMce-placeholder"></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 10px; padding-left: 5px; padding-right: 5px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 64px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 76.8px;"><span class="tinyMce-placeholder">The Green</span></h1>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;text-align:center;width:100%;">
    <h1 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 103px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 123.6px;"><span class="tinyMce-placeholder"><em>reward</em></span></h1>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:28px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:42px;">
    <p style="margin: 0; margin-bottom: 11px;">&nbsp;</p>

    <p style="margin: 0; margin-bottom: 11px;">&nbsp; &nbsp; ${text}</p>
    <p style="margin: 0;">&nbsp;</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    <div class="spacer_block block-9" style="height:110px;line-height:110px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #ffffff;  border-bottom: 30px solid #02151c; border-left: 30px solid #02151c; border-radius: 0; border-right: 30px solid #02151c; border-top: 30px solid #02151c; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
    <table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
    <tbody><tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 40px; padding-bottom: 10px; padding-left: 40px; padding-right: 40px;"></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #000000; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 36px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 43.199999999999996px;"><span class="tinyMce-placeholder"><span style="background-color: #e7ff85;">&nbsp; 
     ${meetUpDetails}&nbsp; </span></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
    <h2 style="margin: 0; color: #000000; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 40px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><span class="tinyMce-placeholder">&nbsp;<span style="background-color: #e7ff85;"> </span><br></span></h2>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="color:#000000;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:25.5px;">&nbsp;</div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
    <p style="margin: 0;">Thank you for being a part of our sustainability community!</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;text-align:center;width:100%;">
    <h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder"><em>Best regards</em></span></h3>
    </td>
    </tr>
    </tbody></table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tbody><tr>
    <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
    <div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
    <p style="margin: 0;">The Green Team</p>
    </div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tbody><tr>
    <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody><tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    <!--[if !vml]><!-->
    <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
    <tbody><tr>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><!-- End -->
    
    </body>
    `;

    // Send the email with meet-up details
    await sendEmail(userEmail, text, html);

    res.status(200).json({ meetUpDetails, message: 'Meet-up reward sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendSurpriseGiftReward = async (req, res) => {
  const { userId, userEmail } = req.body; // Assuming userId and userEmail are provided in the request body

  try {
    // Construct surprise gift details (could be a personalized message or a link to claim the gift)
    const surpriseGiftDetails = `You will receive a surprise gift from a senior!`;

    // Email content
    const text = `Congratulations on earning 2500+ points on Green! 
    You have earned a surprise gift from a senior as a reward. Here are the details:
`;

    const html =` <body class="body" style="margin: 0; background-color: #e7c1b7; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad">
<h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Green</span></h3>
</td>
</tr>
</tbody></table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad">
<h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Oxygen', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: 3px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 16.8px;"><span class="tinyMce-placeholder">Sustainability</span></h3>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e7c1b7; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #02151c; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad" style="padding-bottom:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #303030;"><span> </span></td>
</tr>
</tbody></table>
</div>
</td>
</tr>
</tbody></table>
<div class="spacer_block block-2" style="height:75px;line-height:75px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
<h2 style="margin: 0; color: #e7ff85; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 9px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 15.6px;"><span class="tinyMce-placeholder"></span></h2>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
<tbody><tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tbody><tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 10px; padding-left: 5px; padding-right: 5px;"></td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 64px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 76.8px;"><span class="tinyMce-placeholder">The Green</span></h1>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 103px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 123.6px;"><span class="tinyMce-placeholder"><em>reward</em></span></h1>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
<tbody><tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tbody><tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"></td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tbody><tr>
<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
<div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:28px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:42px;">
<p style="margin: 0; margin-bottom: 11px;">&nbsp;</p>

<p style="margin: 0; margin-bottom: 11px;">&nbsp; &nbsp; ${text}</p>
<p style="margin: 0;">&nbsp;</p>
</div>
</td>
</tr>
</tbody></table>
<div class="spacer_block block-9" style="height:110px;line-height:110px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: cover; color: #000000; background-color: #ffffff;  border-bottom: 30px solid #02151c; border-left: 30px solid #02151c; border-radius: 0; border-right: 30px solid #02151c; border-top: 30px solid #02151c; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
<tbody><tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tbody><tr>
<td style="vertical-align: middle; text-align: center; padding-top: 40px; padding-bottom: 10px; padding-left: 40px; padding-right: 40px;"></td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
<h2 style="margin: 0; color: #000000; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 36px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 43.199999999999996px;"><span class="tinyMce-placeholder"><span style="background-color: #e7ff85;">&nbsp;  ${surpriseGiftDetails}&nbsp; </span></span></h2>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad" style="padding-left:40px;padding-right:40px;text-align:center;width:100%;">
<h2 style="margin: 0; color: #000000; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 40px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><span class="tinyMce-placeholder">&nbsp;<span style="background-color: #e7ff85;"> </span><br></span></h2>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tbody><tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#000000;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:25.5px;">&nbsp;</div>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tbody><tr>
<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
<div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
<p style="margin: 0;">Thank you for being a part of our sustainability community!</p>
</div>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;text-align:center;width:100%;">
<h3 style="margin: 0; color: #e7ff85; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder"><em>Best regards</em></span></h3>
</td>
</tr>
</tbody></table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tbody><tr>
<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
<div style="color:#ffffff;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:20.4px;">
<p style="margin: 0;">The Green Team</p>
</div>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #02151c; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
<tbody><tr>
<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody><tr>
<td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
<tbody><tr>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->

</body>
`;

    // Send the email with surprise gift details
    await sendEmail(userEmail, text, html);

    res.status(200).json({ surpriseGiftDetails, message: 'Surprise gift reward sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Populate the userId with details from the User model if needed
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
