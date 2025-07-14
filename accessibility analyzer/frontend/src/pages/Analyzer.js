import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from 'recharts';
import Button from '../components/Button';
import themeColors from '../components/themeColor';
import HowItWork from '../components/HowItWorks';
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaChartBar, FaExclamationTriangle } from 'react-icons/fa';

const IMPACT_COLORS = [
  themeColors.accent,
  themeColors.warning,
  themeColors.warning,
  themeColors.danger
];

function Analyzer() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }, [navigate]);

  const handleAnalyze = async () => {
    setLoading(true);
    setResults(null);
    try {
      const res = await axios.post('http://localhost:8000/analyze', { url });
      const data = res.data.results;
      setResults(data);
      setGraphData([
        { name: 'Passes', value: data.passes?.length || 0 },
        { name: 'Violations', value: data.violations?.length || 0 },
        { name: 'Incomplete', value: data.incomplete?.length || 0 },
        { name: 'Inapplicable', value: data.inapplicable?.length || 0 },
      ]);
    } catch (err) {
      console.error('Error analyzing URL:', err);
      alert("Failed to analyze URL. Make sure it's valid.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-grayBg text-textDark">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Accessibility Analyzer</h1>

      {/* Input Area */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze"
          className="border border-gray-300 px-4 py-2 w-80 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Enter URL to analyze for accessibility issues"
        />
        <Button
          text={loading ? 'Analyzing...' : 'Analyze'}
          onClick={handleAnalyze}
          aria-label="Start Accessibility Analysis"
        />
      </div>

      <div aria-live="polite" className="sr-only">
        {loading ? "Analyzing the provided URL." : ""}
      </div>

      {!results && !loading && (
        <div className="mt-28">
          <HowItWork />
        </div>
      )}

      {results && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-2 text-primary mb-4">
                <FaChartPie className="text-xl" />
                <h2 className="text-xl font-semibold">Accessibility Overview</h2>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={graphData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {graphData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={IMPACT_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-2 text-primaryDark mb-4">
                <FaChartBar className="text-xl" />
                <h2 className="text-xl font-semibold">Accessibility Trend</h2>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill={themeColors.primaryDark} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-primaryDark">Summary</h2>
            <ul className="grid grid-cols-2 gap-3 text-base">
              <li><strong className="text-accent">✔ Passes:</strong> {results.passes?.length || 0}</li>
              <li><strong className="text-danger">✖ Violations:</strong> {results.violations?.length || 0}</li>
              <li><strong className="text-warning">⚠ Incomplete:</strong> {results.incomplete?.length || 0}</li>
              {results.inapplicable?.length > 0 && (
                <li><strong className="text-gray-500">➖ Inapplicable:</strong> {results.inapplicable.length}</li>
              )}
            </ul>

          </div>

          {/* Violations */}
          {results.violations.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-danger flex items-center gap-2">
                <FaExclamationTriangle /> Violations & Fix Recommendations
              </h2>
              <div className="space-y-6">
                {results.violations.map((v, i) => (
                  <div key={i} className="bg-white p-5 rounded-lg shadow border-l-4 border-danger">
                    <h3 className="text-lg font-semibold">{v.id}</h3>
                    <p className="text-sm text-textLight">{v.description}</p>
                    <p className="text-sm"><strong>Impact:</strong> {v.impact}</p>
                    <p className="text-sm mt-1 text-primary"><strong>Fix:</strong> {v.help}</p>
                    <p className="text-xs mt-2 text-gray-500">Affected Elements:</p>
                    <ul className="list-disc ml-5 text-xs text-gray-600 break-all" aria-label="List of affected HTML elements">
                      {v.nodes.map((node, idx) => (
                        <li key={idx}>{node.html}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Analyzer;
