import React , {useState} from "react";
import { FaUser, FaSignOutAlt, FaCogs, FaLanguage, FaKeyboard, FaGlobe, FaMoon, FaTimes } from "react-icons/fa";
import { MdEmail, MdSwitchAccount, MdDataUsage, MdHelpOutline, MdAddHome } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { TbPremiumRights } from "react-icons/tb";
import styles from "../styles/UserAccount.module.css";
import Razorpay from "razorpay";

const UserAccount = ({onClose}) => {
  const [showUserAccount, setShowUserAccount] = useState(false);

  const handlePremiumClick = () => {
    const razorpay = new window.Razorpay({
      key: "rzp_test_Tnu5VHAQ0C6F9O",
      amount: 19900, //
      currency: "INR",
      name: "Premium Plan",
      description: "Unlimited Downloads for 1 Month",
      handler: function (response) {
        alert("Payment Successful! You can now download unlimited videos.");
        localStorage.setItem("isPremiumUser", "true");
      },
      prefill: {
        name: "Ethan Carter",
        email: "ethancarter@gmail.com",
        contact: "0000000000",
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: function () {
          alert("Payment window closed. Try again if you wish to upgrade.");
        },
      },
    });
  
    razorpay.open();
  };
  
  const handleClose = () => {
    setShowUserAccount(false);
  };
  

  return (
    <div className={styles.userAccount}>
      

      <div className={styles.userInfo}>
        <FaUser className={styles.icon} />
        <div>
          <div className={styles.sampleMessage}>Please Tap on Empty Spaces To Exit</div>
          <div className={styles.sampleMessage}>----------------------------------</div>
          <p className={styles.userName}>Ethan Carter</p>
          <p className={styles.userEmail}>ethancarter@gmail.com</p>
        </div>
      </div>

      <hr className={styles.divider} />

      <ul className={styles.options}>
        <li onClick={handlePremiumClick}>
          <TbPremiumRights className={styles.icon} />
          <span>Premium Package (at Rs.199/month)</span>
        </li>
        <li>
          <SiYoutubestudio className={styles.icon} />
          <span>YouTube Studio</span>
        </li>
        <li>
          <MdSwitchAccount className={styles.icon} />
          <span>Switch account</span>
        </li>
        <li>
          <FaSignOutAlt className={styles.icon} />
          <span>Sign out</span>
        </li>
      </ul>

      <hr className={styles.divider} />

      <ul className={styles.options}>
        <li>
          <MdAddHome className={styles.icon} />
          <span>Purchases and memberships</span>
        </li>
        <li>
          <MdDataUsage className={styles.icon} />
          <span>Your data in YouTube</span>
        </li>
        <li>
          <FaCogs className={styles.icon} />
          <span>Settings</span>
        </li>
        <li>
          <FaMoon className={styles.icon} />
          <span>Appearance: Device theme</span>
        </li>
        <li>
          <FaLanguage className={styles.icon} />
          <span>Language: English (India)</span>
        </li>
        <li>
          <FaGlobe className={styles.icon} />
          <span>Location: India</span>
        </li>
        <li>
          <FaKeyboard className={styles.icon} />
          <span>Keyboard shortcuts</span>
        </li>
        <li>
          <MdHelpOutline className={styles.icon} />
          <span>Help</span>
        </li>
      </ul>
    </div>
  );
};

export default UserAccount;
