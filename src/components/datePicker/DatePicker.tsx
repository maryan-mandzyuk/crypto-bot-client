import ReactDatePicker from "react-datepicker";
import { FC, forwardRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";

interface DatePickerProps {
  endDate: Date;
  startDate: Date;
  setStartDate: (d: Date) => void;
  setEndDate: (d: Date) => void;
}
export const DatePicker: FC<DatePickerProps> = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}) => {
  useEffect(() => {
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);

  return (
    <div className="flex items-center justify-center max-w-2xl pb-4 mx-auto space-x-4">
      <span className="font-medium text-gray-900">Date range:</span>
      <div className="relative w-40">
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date || new Date())}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel=">>"
          previousMonthButtonLabel="<<"
          popperClassName="react-datepicker-left"
          customInput={<ButtonInput />}
          maxDate={new Date()}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-lg text-gray-700">
                {format(date, "MMMM yyyy")}
              </span>

              <div className="space-x-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        />
      </div>
      <div className="relative w-40">
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date || new Date())}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          nextMonthButtonLabel=">"
          previousMonthButtonLabel="<"
          popperClassName="react-datepicker-right"
          customInput={<ButtonInput />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-lg text-gray-700">
                {format(date, "MMMM yyyy")}
              </span>

              <div className="space-x-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

//@ts-ignore
const ButtonInput = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    //@ts-ignore
    ref={ref}
    type="button"
    className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
  >
    {format(new Date(value), "dd MMMM yyyy")}
  </button>
));
