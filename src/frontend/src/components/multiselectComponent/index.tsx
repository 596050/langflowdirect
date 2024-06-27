"use client";

import { cva, VariantProps } from "class-variance-authority";
import isEqual from "lodash.isequal";
import { CheckIcon, ChevronDown, XCircle, XIcon } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

import useMergeRefs, {
  isRefObject,
} from "../../CustomNodes/hooks/use-merge-refs";
import { cn } from "../../utils/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverContentWithoutPortal,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";

type MultiSelectValue = {
  label: string;
  value: string;
};

interface MultiSelectProps<T>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue">,
    VariantProps<typeof multiSelectVariants> {
  options: T[];
  onValueChange: (value: T[]) => void;
  defaultValue: T[];
  placeholder?: string;
  maxCount?: number;
  asChild?: boolean;
  className?: string;
  editNode?: boolean;
}

const BadgeWrapper = ({
  value,
  variant,
  className,
  onDelete,
}: {
  value: MultiSelectValue;
  variant: MultiSelectProps<MultiSelectValue>["variant"];
  className: MultiSelectProps<MultiSelectValue>["className"];
  onDelete: ({ value }: { value: MultiSelectValue }) => void;
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleDelete = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    onDelete({ value });
  };

  return (
    <Badge
      className={cn(
        "rounded-sm p-0",
        multiSelectVariants({ variant, className }),
      )}
    >
      <div id="content" className="p-1 pr-0" ref={badgeRef}>
        {value?.label}
      </div>
      <div id="spacer" className="p-1" />
      <div
        id="delete"
        className="flex items-center justify-center px-1 hover:bg-red-300/80"
        style={{
          minHeight: `${badgeRef?.current?.clientHeight}px`,
        }}
      >
        <XCircle
          className="h-4 min-h-4 w-4 min-w-4 cursor-pointer"
          onClick={handleDelete}
          style={{
            minHeight: `${badgeRef?.current?.clientHeight}px`,
          }}
        />
      </div>
    </Badge>
  );
};

const multiSelectVariants = cva("m-1 ", {
  variants: {
    variant: {
      default:
        "border-foreground/10 text-foreground bg-card hover:bg-card/80 whitespace-normal",
      secondary:
        "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-normal",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 whitespace-normal",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const MultiSelect = forwardRef<
  HTMLButtonElement,
  MultiSelectProps<MultiSelectValue>
>(
  (
    {
      options = [],
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      maxCount = 3,
      asChild = false,
      className,
      editNode = false,
      value,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] =
      useState<MultiSelectValue[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const combinedRef = useMergeRefs<HTMLButtonElement>(ref);

    useEffect(() => {
      if (!isEqual(selectedValues, defaultValue)) {
        setSelectedValues(defaultValue);
      }
    }, [defaultValue, selectedValues]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = ({ value }: { value: MultiSelectValue }) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues?.length === options?.length) {
        handleClear();
      } else {
        setSelectedValues(options);
        onValueChange(options);
      }
    };

    const PopoverContentDropdown =
      //   children ||
      editNode ? PopoverContent : PopoverContentWithoutPortal;

    const popoverContentDropdownMinWidth = isRefObject(combinedRef)
      ? `${combinedRef?.current?.clientWidth}px`
      : "200px";

    const popoverContentDropdownHeight = isRefObject(combinedRef)
      ? `${combinedRef?.current?.clientHeight}px`
      : "200px";

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={combinedRef}
            {...props}
            onClick={handleTogglePopover}
            variant="primary"
            size="xs"
            role="combobox"
            className={cn(
              editNode
                ? "dropdown-component-outline"
                : "dropdown-component-false-outline",
              "w-full justify-between font-normal",
              editNode ? "input-edit-node" : "py-2",
              className,
            )}
          >
            {selectedValues?.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {selectedValues?.slice(0, maxCount).map((selectedValue) => {
                    return (
                      <BadgeWrapper
                        value={selectedValue}
                        onDelete={toggleOption}
                        variant={variant}
                        className={className}
                        key={selectedValue.value}
                      />
                    );
                  })}
                  {selectedValues?.length > maxCount ? (
                    <Badge
                      className={cn(
                        "border-foreground/1 rounded-sm bg-transparent p-0 text-foreground hover:bg-transparent",
                        multiSelectVariants({ variant, className }),
                      )}
                    >
                      <div
                        id="content"
                        className="p-1 pr-0"
                      >{`+ ${selectedValues?.length - maxCount} more`}</div>
                      <div id="spacer" className="p-1" />
                      <div
                        id="delete"
                        className="flex items-center justify-center px-1 hover:bg-red-300/80"
                      >
                        <XCircle
                          className="h-4 min-h-4 w-4 min-w-4 cursor-pointer"
                          //   onClick={toggleOption}
                        />
                      </div>
                    </Badge>
                  ) : null}
                </div>
                <div
                  className="flex items-center justify-between"
                >
                  <XIcon
                    className="mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />
                  <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="mx-3 text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContentDropdown
          id="multiselect-content"
          side="bottom"
          //    avoidCollisions={!!children}
          className={cn(
            `nocopy nowheel nopan nodelete nodrag noundo w-full p-0`,
          )}
          style={{
            minWidth: popoverContentDropdownMinWidth,
            maxWidth: popoverContentDropdownMinWidth,
          }}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search"
              onKeyDown={handleInputKeyDown}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="select-all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues?.length === options?.length
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
                {options?.map((option) => {
                  const isSelected = !!selectedValues.find(
                    (sv) => sv.value === option.value,
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption({ value: option })}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues?.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 cursor-pointer justify-center"
                      >
                        Clear
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex h-full min-h-6"
                      />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 cursor-pointer justify-center"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContentDropdown>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
