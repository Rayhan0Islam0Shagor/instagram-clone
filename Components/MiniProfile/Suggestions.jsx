import { useState, useEffect } from 'react';
import faker from 'faker';
import Suggestion from './Suggestion';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => {
      return {
        id: i,
        ...faker.helpers.contextualCard(),
      };
    });

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold">Suggestions for you</h3>
        <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
          See All
        </button>
      </div>

      {suggestions.map((suggestion) => {
        return (
          <Suggestion
            key={suggestion.id}
            avatar={suggestion.avatar}
            name={suggestion.name}
            info={suggestion.company.name}
          />
        );
      })}
    </div>
  );
};

export default Suggestions;
