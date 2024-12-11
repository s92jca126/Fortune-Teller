export default function getBaseURL() {
  if (window.location.hostname === "localhost") {
    return "http://localhost:8080"; // Local development
  }
  return "http://64.23.163.14:8080"; // Production (hosted droplet)
}
