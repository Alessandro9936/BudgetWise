const PasswordRequirements = () => {
  return (
    <ul className="mx-4 flex list-disc justify-between gap-2 text-sm">
      <div>
        <li className="mb-2">A minimum of 8 characters</li>
        <li>At least one lowercase letter</li>
      </div>
      <div>
        <li className="mb-2">At least one number</li>
        <li>At least one upper letter</li>
      </div>
    </ul>
  );
};

export default PasswordRequirements;
