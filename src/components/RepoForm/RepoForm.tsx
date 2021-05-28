import React from "react";
import styles from "./RepoForm.module.css";

export interface RepoFormProps {
  onSubmit: (organization: string, repository: string) => void;
}

const RepoForm: React.FC<RepoFormProps> = ({ onSubmit }) => {
  const [organization, setOrganization] = React.useState("");
  const [repository, setRepository] = React.useState("");

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization(e.currentTarget.value);
  };

  const handleRepositoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepository(e.currentTarget.value);
  };

  const handleSubmit = () => {
    if (organization && repository) {
      onSubmit(organization, repository);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="organization">Organization:</label>
        <input
          id="organization"
          value={organization}
          onChange={handleOrganizationChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="repository">Repository:</label>
        <input
          id="repository"
          value={repository}
          onChange={handleRepositoryChange}
        />
      </div>
      <button
        type="button"
        disabled={!organization && !repository}
        onClick={handleSubmit}
      >
        Load
      </button>
    </div>
  );
};

export default RepoForm;
