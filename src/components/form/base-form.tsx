import { FormEvent } from "react";
import { Button } from "../button";

type BaseFormProps = {
    handleSubmit: (e: FormEvent) => Promise<void>;
    input: string;
    setInput: (value: string) => void;
    loading: boolean;
};

/** Base Form component which can be re-used in the future by EditTodoForm component */
export const BaseForm = ({ handleSubmit, input, setInput, loading }: BaseFormProps) =>
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter todo"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            disabled={loading}
            required
            maxLength={500}
        />
        <Button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
        >
            {loading ? 'Adding...' : 'Add Todo'}
        </Button>
    </form>