import { Languages } from "@/app/utils/enums";
import { setDirction } from "@/app/utils/helperServer";
import { Input } from "@/components/ui/input";
import { AiOutlineUpload } from "react-icons/ai"; // استيراد الأيقونات من react-icons
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface FilleFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  label?: string;
  type: string;
  name: keyof T;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  defaultValue?: string;
  readOnly?: boolean;
  onchangeFile?: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof T
  ) => void;
  fileName?: string;
}

const FilleField = <T extends FieldValues>({
  name,
  type,
  disabled,
  autoFocus,
  error,
  readOnly,
  register,
  onchangeFile,
  placeholder,
  fileName,
}: FilleFieldProps<T>) => {
  const locale = useLocale() as Languages;
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }

    if (onchangeFile) {
      onchangeFile(e, name);
    }
  };
  return (
    <div className="flex flex-col" dir={setDirction(locale)}>
      <label className="justify-between flex items-center gap-2 border !border-border_input rounded-lg p-2 cursor-pointer hover:bg-hover">
        <span className="text-sm text-muted-foreground">
          {fileName || placeholder}
        </span>
        {isUploaded ? (
          <IoIosCheckmarkCircleOutline className="w-5 h-5 success" />
        ) : (
          <AiOutlineUpload className="w-5 h-5 text-muted-foreground" />
        )}

        {/* If it's a file input */}
        {type === "file" ? (
          <Input
            type={type}
            className="hidden"
            {...register(name as Path<T>, {
              onChange: handleFileChange,
            })}
            disabled={disabled}
            autoFocus={autoFocus}
            readOnly={readOnly}
          />
        ) : (
          // You can handle other types like text, password, etc., here
          <Input
            type={type}
            className="hidden"
            {...register(name as Path<T>, {
              onChange: (e) => onchangeFile && onchangeFile(e, name),
            })}
            disabled={disabled}
            autoFocus={autoFocus}
            readOnly={readOnly}
          />
        )}
      </label>
      {error && error.message && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error.message ? "text-destructive" : ""
          }`}
        >
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default FilleField;
