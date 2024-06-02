import { useState } from "react";
import "./ToolTip.css";

export default function ToolTip2() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="ui-tooltip">
      <button
        className="button-ico button-set"
        data-tooltip-id="help"
        onClick={() => {
          setVisible(!visible);
        }}
      />
      {visible && (
        <div data-tooltip-id="help">
          <span className="span-text">
            일본어 품사 사전을 바탕으로 한 분석 결과입니다.
          </span>
        </div>
      )}
    </div>
  );
}
