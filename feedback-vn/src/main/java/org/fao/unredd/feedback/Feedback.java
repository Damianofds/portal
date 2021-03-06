package org.fao.unredd.feedback;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.fao.unredd.portal.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Feedback {

	private static final Logger logger = LoggerFactory.getLogger(Feedback.class);

//	private FeedbackPersistence persistence;
	private Mailer mailer;
//	private String srid = "900913";

	public Feedback( Mailer mailer ) {
		this.mailer = mailer;
	}
	
	public void send(String replyTo, String affiliation, String location, String comments) throws AddressException, MessagingException {
		// TODO Auto-generated method stub
		StringBuffer msg = new StringBuffer();
		msg.append( "From: " );
		msg.append( replyTo );
		msg.append( "\r\n\r\n");
		msg.append( "Affiliation: " );
		msg.append( affiliation );
		msg.append( "\r\n\r\n");
		msg.append( "Location: ");
		msg.append( location );
		msg.append( "\r\n\r\n");
		msg.append( "Comments: ");
		msg.append( "\r\n");
		msg.append( comments);
		msg.append( "\r\n");
		
		mailer.sendFeedback( replyTo , msg.toString() );
		
	}
	
	public String send(String geom, String comment, String email, String layerName, String layerDate, String linkLanguage, String mailTitle, String verificationMessage)
			throws CannotSendMailException, PersistenceException, MissingArgumentException {
//		checkNull("geom", geom);
//		checkNull("comment", comment);
//		checkNull("email", email);
//		checkNull("layerName", layerName);

		logger.info("Feedback requested with the following parameters:");
		logger.info("email: " + email);
		logger.info("geom: " + geom);
		logger.info("comment: " + comment);
		logger.info("layerName: " + layerName);
		logger.info("date: " + layerDate);

		/*
		 * non unique verification code, but these are valid only a period of time so collisions are very rare
		 */
		String verificationCode = Integer.toString((geom + comment + email).hashCode());
//		try {
//			mailInfo.sendVerificationMail(linkLanguage, mailTitle, verificationMessage, email, verificationCode);
//		} catch (MessagingException e) {
//			throw new CannotSendMailException(e);
//		}
		

		return verificationCode;
	}

	


//	public void verify(String verificationCode) throws VerificationCodeNotFoundException, PersistenceException, AddressException, MessagingException {
//		if (persistence.existsUnverified(verificationCode)) {
//			persistence.verify(verificationCode);
//			mailInfo.sendVerifiedMail(verificationCode);
//		} else {
//			throw new VerificationCodeNotFoundException();
//		}
//	}

//	public void notifyValidated(Config config) throws PersistenceException {
//		CommentInfo[] entries = persistence.getValidatedToNotifyInfo();
//		for (CommentInfo entry : entries) {
//			try {
//				ResourceBundle messages = config.getMessages(new Locale(entry.getLanguage()));
//				mailInfo.sendValidatedMail(entry.getMail(), entry.getVerificationCode(), messages.getString("Feedback.validated-mail-text"),
//						messages.getString("Feedback.mail-title"));
//				persistence.setNotified(entry.getId());
//			} catch (MessagingException e) {
//				logger.error("Error sending mail:" + entry.getMail(), e);
//				// ignore
//			}
//		}
//	}
//
//	public void createTable() throws PersistenceException {
//		persistence.createTable();
//	}

}
