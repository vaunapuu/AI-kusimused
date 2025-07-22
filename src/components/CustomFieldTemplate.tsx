const CustomFieldTemplate = (props: any) => {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children,
  } = props;

  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={id} className="font-weight-bold">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      {/* 🔽 Custom placement of description below label and above field */}
      {description && (
        <div className="text-muted mb-2" style={{ fontSize: "0.9em" }}>
          {description}
        </div>
      )}

      {children}
      {errors}
      {help}
    </div>
  );
};

export default CustomFieldTemplate;
