import React from "react";
import PropTypes from "prop-types";
import "./message-history.style.css";

export const MessageHistory = ({ msg }) => {
  !msg && (msg = []);

  return msg.map((row, index) => (
    
      <div key={index} className="message-history mt-3">
        <div className="send text-secondary">
          <div className="sender">{row.sender}</div>
          {/* toLocalString makes date readable.  row.msgAt alone could be use, but is difficult to read. */}
          <div className="date">{row.msgAt && new Date(row.msgAt).toLocaleString()}</div>
        </div>
        <div className="message">{row.message}</div>
      </div>
  ));
};

MessageHistory.propTypes = {
  msg: PropTypes.array.isRequired,
};
