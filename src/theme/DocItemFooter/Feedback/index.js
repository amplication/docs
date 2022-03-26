import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export default function Feedback({ location, content }) {
  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted) return;
    const data = new FormData(e.target);
    const isHelpful = data.get("helpful") === "true";
    setSubmitted(true);
    window.analytics
      .track("Docs Feedback", {
        title: content.contentTitle || "UNKNOWN",
        isHelpful,
        url: location.pathname,
      })
      .catch(console.warn);
  };

  const onChange = (e) => e.target.form.requestSubmit();

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className={clsx(styles.feedback)}>
        <legend>Was this page helpful?</legend>
        {submitted ? (
          <p className={clsx(styles["thank-you"])}>
            Thank You For Your Feedback 🤩
          </p>
        ) : (
          <>
            <div>
              <input
                type="radio"
                id="helpful-yes"
                name="helpful"
                value="true"
                onChange={onChange}
              />
              <label htmlFor="helpful-yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="helpful-no"
                name="helpful"
                value="false"
                onChange={onChange}
              />
              <label htmlFor="helpful-no">No</label>
            </div>
          </>
        )}
      </fieldset>
    </form>
  );
}
