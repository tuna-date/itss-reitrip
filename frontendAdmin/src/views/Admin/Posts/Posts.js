import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  Button, Card,
  CardBody,
  Col, Modal, ModalBody,
  ModalHeader,
  Row,
  TabContent,
  Table,
  TabPane, Spinner, Container, Input, NavItem,InputGroup,InputGroupAddon,InputGroupText
} from 'reactstrap';
import styles from "../../Config/styles";
import {agency} from "../Component/Request";

const data = {"total":11,"page_size":10,"message":"Get list succesfully","data":[{"website":"Mysterytree.com","ward_id":169,"user_admin_id":56,"type":"agency","tag":null,"number_phone":"0987654321","name":"Mystery Tree","id":39,"email":"support_mystery@gmail.com","district_id":17,"description":null,"city_id":1,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/39/original-company-original-file_manager-flightlandscapenatureskyjpg.jpg.39.jpg","address":"255 Hoàng Văn Thái"},{"website":null,"ward_id":null,"user_admin_id":45,"type":"agency","tag":null,"number_phone":"909080980","name":"CEPO đất đai","id":28,"email":"bk@gmail.com","district_id":null,"description":"<p><!--[if !mso]>\n<style>\nv\\:* {behavior:url(#default#VML);}\no\\:* {behavior:url(#default#VML);}\nw\\:* {behavior:url(#default#VML);}\n.shape {behavior:url(#default#VML);}\n</style>\n<![endif]--><!--[if gte mso 9]><xml>\n <o:OfficeDocumentSettings>\n  <o:AllowPNG></o:AllowPNG>\n </o:OfficeDocumentSettings>\n</xml><![endif]--><!--[if gte mso 9]><xml>\n <w:WordDocument>\n  <w:View>Normal</w:View>\n  <w:Zoom>0</w:Zoom>\n  <w:TrackMoves>false</w:TrackMoves>\n  <w:TrackFormatting></w:TrackFormatting>\n  <w:PunctuationKerning></w:PunctuationKerning>\n  <w:ValidateAgainstSchemas></w:ValidateAgainstSchemas>\n  <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>\n  <w:IgnoreMixedContent>false</w:IgnoreMixedContent>\n  <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>\n  <w:DoNotPromoteQF></w:DoNotPromoteQF>\n  <w:LidThemeOther>EN-US</w:LidThemeOther>\n  <w:LidThemeAsian>X-NONE</w:LidThemeAsian>\n  <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>\n  <w:Compatibility>\n   <w:BreakWrappedTables></w:BreakWrappedTables>\n   <w:SnapToGridInCell></w:SnapToGridInCell>\n   <w:WrapTextWithPunct></w:WrapTextWithPunct>\n   <w:UseAsianBreakRules></w:UseAsianBreakRules>\n   <w:DontGrowAutofit></w:DontGrowAutofit>\n   <w:SplitPgBreakAndParaMark></w:SplitPgBreakAndParaMark>\n   <w:EnableOpenTypeKerning></w:EnableOpenTypeKerning>\n   <w:DontFlipMirrorIndents></w:DontFlipMirrorIndents>\n   <w:OverrideTableStyleHps></w:OverrideTableStyleHps>\n  </w:Compatibility>\n  <m:mathPr>\n   <m:mathFont m:val=\"Cambria Math\"></m:mathFont>\n   <m:brkBin m:val=\"before\"></m:brkBin>\n   <m:brkBinSub m:val=\"&#45;-\"></m:brkBinSub>\n   <m:smallFrac m:val=\"off\"></m:smallFrac>\n   <m:dispDef></m:dispDef>\n   <m:lMargin m:val=\"0\"></m:lMargin>\n   <m:rMargin m:val=\"0\"></m:rMargin>\n   <m:defJc m:val=\"centerGroup\"></m:defJc>\n   <m:wrapIndent m:val=\"1440\"></m:wrapIndent>\n   <m:intLim m:val=\"subSup\"></m:intLim>\n   <m:naryLim m:val=\"undOvr\"></m:naryLim>\n  </m:mathPr></w:WordDocument>\n</xml><![endif]--><!--[if gte mso 9]><xml>\n <w:LatentStyles DefLockedState=\"false\" DefUnhideWhenUsed=\"true\"\n  DefSemiHidden=\"true\" DefQFormat=\"false\" DefPriority=\"99\"\n  LatentStyleCount=\"267\">\n  <w:LsdException Locked=\"false\" Priority=\"0\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Normal\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"heading 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 7\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 8\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"9\" QFormat=\"true\" Name=\"heading 9\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 7\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 8\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" Name=\"toc 9\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"35\" QFormat=\"true\" Name=\"caption\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"10\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Title\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"1\" Name=\"Default Paragraph Font\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"11\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Subtitle\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"22\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Strong\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"20\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Emphasis\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"59\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Table Grid\"></w:LsdException>\n  <w:LsdException Locked=\"false\" UnhideWhenUsed=\"false\" Name=\"Placeholder Text\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"1\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"No Spacing\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"60\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Shading\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"61\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light List\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"62\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Grid\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"63\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"64\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"65\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"66\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"67\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"68\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"69\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"70\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Dark List\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"71\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Shading\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"72\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful List\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"73\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Grid\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"60\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Shading Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"61\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light List Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"62\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Grid Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"63\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 1 Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"64\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 2 Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"65\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 1 Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" UnhideWhenUsed=\"false\" Name=\"Revision\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"34\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"List Paragraph\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"29\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Quote\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"30\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Intense Quote\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"66\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 2 Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"67\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 1 Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"68\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 2 Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"69\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 3 Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"70\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Dark List Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"71\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Shading Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"72\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful List Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"73\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Grid Accent 1\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"60\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Shading Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"61\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light List Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"62\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Grid Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"63\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 1 Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"64\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 2 Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"65\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 1 Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"66\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 2 Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"67\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 1 Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"68\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 2 Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"69\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 3 Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"70\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Dark List Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"71\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Shading Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"72\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful List Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"73\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Grid Accent 2\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"60\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Shading Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"61\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light List Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"62\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Grid Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"63\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 1 Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"64\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 2 Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"65\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 1 Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"66\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 2 Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"67\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 1 Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"68\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 2 Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"69\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 3 Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"70\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Dark List Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"71\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Shading Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"72\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful List Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"73\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Grid Accent 3\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"60\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Shading Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"61\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light List Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"62\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Grid Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"63\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 1 Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"64\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 2 Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"65\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 1 Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"66\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 2 Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"67\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 1 Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"68\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 2 Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"69\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 3 Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"70\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Dark List Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"71\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Shading Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"72\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful List Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"73\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Grid Accent 4\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"60\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Shading Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"61\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light List Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"62\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Grid Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"63\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 1 Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"64\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 2 Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"65\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 1 Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"66\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 2 Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"67\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 1 Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"68\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 2 Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"69\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 3 Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"70\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Dark List Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"71\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Shading Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"72\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful List Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"73\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Grid Accent 5\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"60\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Shading Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"61\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light List Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"62\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Light Grid Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"63\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 1 Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"64\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Shading 2 Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"65\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 1 Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"66\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium List 2 Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"67\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 1 Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"68\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 2 Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"69\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Medium Grid 3 Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"70\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Dark List Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"71\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Shading Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"72\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful List Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"73\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" Name=\"Colorful Grid Accent 6\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"19\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Subtle Emphasis\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"21\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Intense Emphasis\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"31\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Subtle Reference\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"32\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Intense Reference\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"33\" SemiHidden=\"false\"\n   UnhideWhenUsed=\"false\" QFormat=\"true\" Name=\"Book Title\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"37\" Name=\"Bibliography\"></w:LsdException>\n  <w:LsdException Locked=\"false\" Priority=\"39\" QFormat=\"true\" Name=\"TOC Heading\"></w:LsdException>\n </w:LatentStyles>\n</xml><![endif]--><!--[if gte mso 10]>\n<style>\n /* Style Definitions */\n table.MsoNormalTable\n\t{mso-style-name:\"Table Normal\";\n\tmso-tstyle-rowband-size:0;\n\tmso-tstyle-colband-size:0;\n\tmso-style-noshow:yes;\n\tmso-style-priority:99;\n\tmso-style-parent:\"\";\n\tmso-padding-alt:0in 5.4pt 0in 5.4pt;\n\tmso-para-margin-top:0in;\n\tmso-para-margin-right:0in;\n\tmso-para-margin-bottom:10.0pt;\n\tmso-para-margin-left:0in;\n\tline-height:115%;\n\tmso-pagination:widow-orphan;\n\tfont-size:11.0pt;\n\tfont-family:\"Calibri\",\"sans-serif\";\n\tmso-ascii-font-family:Calibri;\n\tmso-ascii-theme-font:minor-latin;\n\tmso-hansi-font-family:Calibri;\n\tmso-hansi-theme-font:minor-latin;}\n</style>\n<![endif]-->\n\n<br></p><p class=\"MsoNormal\" style=\"mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;\ntext-align:justify;line-height:normal\"><span style=\"font-size:12.0pt;\nfont-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;\">Dự\nán The Terra An Hưng tọa lạc tại mặt đường Tố Hữu, quận Hà Đông bao gồm hai hợp\nphần: khu nhà ở thấp tầng với các căn nhà phố thương mại (shophouse) và khu nhà\nở cao tầng với văn phòng, thương mại dịch vụ và căn hộ chung cư chất lượng\ncao.&nbsp;</span></p><p>\n\n<br></p><p class=\"MsoNormal\" style=\"mso-margin-top-alt:auto;mso-margin-bottom-alt:\nauto;text-align:center;line-height:normal\" align=\"center\"><span style=\"font-size:12.0pt;\nfont-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;\nmso-no-proof:yes\"><img src=\"file:///C:\\Users\\ThangLD\\AppData\\Local\\Temp\\msohtmlclip1\\01\\clip_image002.jpg\" alt=\"https://static12.zamba.vn/thumb_wm,80/825/rb_up_es/editor/5675/2019/06/07/21/08/7641559894892.4806.jpg\" width=\"667\" height=\"434\"></span><span style=\"font-size:12.0pt;\nfont-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;\"></span></p><p>\n\n<br></p><p class=\"MsoNormal\" style=\"mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;\ntext-align:justify;line-height:normal\"><b><span style=\"font-size:12.0pt;\nfont-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;\">Chung\ncư The Terra An Hưng</span></b><span style=\"font-size:12.0pt;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;;\nmso-fareast-font-family:&quot;Times New Roman&quot;\">&nbsp;là sự kết hợp của những không\ngian hiện đại với thiết kế tinh tế ấn tượng trong từng đường nét. Ba tòa tháp\nchung cư The Terra An Hưng nằm chính giữa của dự án và được bao quanh bởi khu\nnhà thấp tầng. Là sự giao hòa độc đáo của nét kiến trúc hiện đại mang đậm chất\nChâu Âu trong long Hà Nội.</span></p><p>\n\n<br></p><p class=\"MsoNormal\" style=\"mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;\ntext-align:justify;line-height:normal\"><span style=\"font-size:12.0pt;\nfont-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;\"><br>\n<b>Shophouse The Terra An Hưng&nbsp;</b>được thiết kế với những dãy nhà phố có\nkhông gian mở, kết nối linh hoạt đường Tố Hữu – Khu đô thị An Hưng – Khu đô thị\nDương Nội Nam Cường. Với mặt tiền rộng trên 6.5m, chiều cao 7 tầng ( 6 tầng 1\ntum ) và các loại diện tích, cư dân The Terra có thể lựa chọn linh hoạt các mẫu\nShophouse từ 65m2 đến 138m2.</span></p><p>\n\n<br></p><p class=\"MsoNormal\" style=\"mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;\ntext-align:justify;line-height:normal\"><span style=\"font-size:12.0pt;\nfont-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;\"><br>\n<b>Liền kề The Terra An Hưng</b>&nbsp;với sự bao bọc phía trên là các mặt\nshophouse và phía dưới với 3 tòa chung cư cao 45 tầng thiết kế vơi chiều cao 5\ntầng 1 tum. Với số lượng khá lớn khá phù hợp để ở tránh đi khói bụi ồn ào của\nmặt đường và khả năng kinh doanh phục vụ cho cư dân chung cư của dự án cũng như\nphục vụ người dân các khu lân cận. Alo alo</span></p><p>\n\n<br></p>","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/28/original-company-original-file_manager-djpg.jpg.28.jpg","address":"hoang hoa tham"},{"website":null,"ward_id":null,"user_admin_id":28,"type":"agency","tag":"best seller","number_phone":"test 090909","name":"Test tên công ty MG","id":21,"email":"support_cocxinh2@gmail.com","district_id":null,"description":"<p>Test thư edit công ty môi giới</p><p><br></p><p><br></p><p><img src=\"https://i-dulich.vnecdn.net/2019/02/26/1-1551149516_680x0.jpg \" style=\"width: 600px;\"></p><p>Cốc được làm từ đất sét của sông Tô Lịch</p><p><iframe src=\"//www.youtube.com/embed/PC3BERemYMM\" class=\"note-video-clip\" width=\"640\" height=\"360\" frameborder=\"0\"></iframe><br></p><p> </p>","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/21/original-company-original-file_manager-Ph%25E1%25BB%2591i%2520c%25E1%25BA%25A3nh%2520d%25E1%25BB%25B1%2520%25C3%25A1n%2520khu%2520%25C4%2591%25C3%25B4%2520th%25E1%25BB%258B%2520Gardenia%2520M%25E1%25BB%25B9%2520%25C4%2590%25C3%25ACnh%25205.jpg.jpg.21.jpg","address":"Test đc"},{"website":"www.navos.com","ward_id":476,"user_admin_id":27,"type":"agency","tag":"top 2 company","number_phone":"096966969","name":"Công ty môi giới số 1","id":20,"email":"support_navo@gmail.com","district_id":278,"description":"<p>Là tập đoàn kinh doanh bất động sản đứng thứ 2 Việt Nam .</p><p><img src=\"https://img.vietnamfinance.vn/thumbs/700x0/upload/news/dinhtinh/2019/1/27/bat-dong-san-thang-ngau-reatimes-1543985111.jpg\" alt=\"Kết quả hình ảnh cho bất động sản\"><br></p>","city_id":1,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/20/original-company-original-file_manager-modulejpg.jpg.20.jpg","address":"Tp.HCM"},{"website":null,"ward_id":null,"user_admin_id":23,"type":"agency","tag":"best seller","number_phone":"098989898","name":"Meme Corp","id":16,"email":"support_memecorp@gmail.com","district_id":null,"description":"Công ty giải trí .","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/16/original-company-original-file_manager-boundary-wall-design_800x600.jpg.jpg.16.jpg","address":"Huế"},{"website":null,"ward_id":null,"user_admin_id":22,"type":"agency","tag":"best designer ","number_phone":"038388383","name":"HomeDecor San","id":15,"email":"support_homedecorsan@gmail.com","district_id":null,"description":"Công ty cung cấp các giải pháp thiết kế căn hộ. Liên tục cập nhật các xu thế mới mang lại những hơi thở mới  cho căn phòng của bạn . ","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/15/original-company-original-file_manager-1-1502788153.png.png.15.png","address":"Cát Bà"},{"website":null,"ward_id":null,"user_admin_id":21,"type":"agency","tag":"best greener","number_phone":"07676766767","name":"Ponxai Corp","id":14,"email":"support_ponxaicorp@gmail.com","district_id":null,"description":"Công ty chúng tôi kinh doanh các mặt hàng cây cảnh đẹp ,nhỏ gọn hướng tới các khách hàng tiềm năng như doanh nghiệp ,căn hộ nhỏ,quán cà phê giúp tạo nên môi trường xanh thân thiện với môi trường.","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/14/original-company-original-file_manager-trongcaytheophongthuymangtailocmayman-350a572q9ox20l91gydlhm.jpg.jpg.14.jpg","address":"Long Biên"},{"website":null,"ward_id":null,"user_admin_id":20,"type":"agency","tag":"best seller","number_phone":"01551515115","name":"TripCar","id":13,"email":"support_tripcar@gmail.com","district_id":null,"description":"Công ty chúng tôi cung cấp các phụ kiện cho ô tô,đồ chuẩn bị cho các chuyến du lịch xa kéo dài,đảm bảo an toàn và tiện nghi tuyệt đối dành cho bạn !","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/13/original-company-original-file_manager-cars.jpg.jpg.13.jpg","address":"Nha Trang"},{"website":null,"ward_id":null,"user_admin_id":19,"type":"agency","tag":null,"number_phone":"096696969","name":"Nin10do Corp","id":12,"email":"support_nin10docorp@gmail.com","district_id":null,"description":"Công ty cung cấp tem dán tượng tô và móc chìa khóa bokemon.","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/12/original-company-original-file_manager-sam-56.jpg.jpg.12.jpg","address":"Dapan"},{"website":null,"ward_id":null,"user_admin_id":17,"type":"agency","tag":null,"number_phone":"0986172271","name":"Lucky Cat","id":10,"email":"support_luckycat@gmail.com","district_id":null,"description":"Chuyên kinh doanh vật cầu danh,cầu tài mang lại may mắn .Sản phẩm tinh xảo chân thật ,dịch vụ tận tâm ân cần ,bảo hành uy tín.","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/10/original-company-original-file_manager-IMG_0234.JPG.JPG.10.JPG","address":"34 Trần Nhân Tông"},{"website":null,"ward_id":null,"user_admin_id":16,"type":"agency","tag":"sáng tạo","number_phone":"0935123321","name":"Lazy Tiger Corp","id":9,"email":"support-lazytiger@gmail.com","district_id":null,"description":"Cung cấp các sản phẩm liên quan đến giường ngủ","city_id":null,"avatar":"http://159.65.136.144:4001/uploads/companies/photo/9/original-company-original-file_manager-IMG_0043.JPG.JPG.9.JPG","address":"46 Trường Chinh"}]};


class Posts extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      isLoaded: false,
      data: [],
      currentBrocker: {},
      listRequestBrockers: [],
      modalId: undefined,
      currentRequestBrocker: {},
      modalRequestId: 0,
      alert: null,
      filterField: {
        name: "",
        email: "",
        number_phone: "",
      }
    };
  }

  componentDidMount() {
    // agency().then((responseJson) => {
      this.setState({data: data.data, isLoaded: true});
    // });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');
  }

  renderAlert(id,index){
    const getAlert = () => (
      <SweetAlert
        custom
        showCancel
        confirmBtnText="Xóa"
        cancelBtnText="Hủy"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Bạn chắc chắn muốn xóa?"
        onConfirm={()=>this.deleteAdminBrocker(id,index)}
        onCancel={() => this.hideAlert()}
      >
        Bạn không thể khôi phục được thông tin đã xóa!
      </SweetAlert>

    );
    this.setState({
      alert: getAlert()
    });
  }
  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  togglePrimary(index) {
    this.setState({
      showModal: !this.state.showModal,
      modalId: index,
    });
  }

  handleChange(event) {
    this.state.filterField[event.target.name] = event.target.value;
    this.setState(({filterField: this.state.filterField}));
  }

  isSuitableCompany(company) {
    let fields = this.state.filterField;
    return ((company.name && company.name.toLowerCase().indexOf(fields.name.toLowerCase())) !== -1) &&
      ((company.email && company.email.toLowerCase().indexOf(fields.email.toLowerCase())) !== -1) &&
      ((company.number_phone && company.number_phone.toLowerCase().indexOf(fields.number_phone.toLowerCase())) !== -1);
  }

  renderCompanyRow() {
    let filtering = (this.state.filterField.name || this.state.filterField.email || this.state.filterField.number_phone);
    let companies;
    if (!filtering) {
      companies = this.state.data;
    } else {
      companies = this.state.data.filter(x => this.isSuitableCompany(x));
    }
    console.log(companies);
    return companies.map((data, index) =>
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td><img src={data.avatar} alt="" style={{height: 70}}/></td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.number_phone}</td>
        <td>
          <Button onClick={() => this.togglePrimary(data.id)} className="mr-1 btn-info">
            <i className="fa fa-eye"/>
          </Button>
          <Button className="mr-1 btn-primary" color="primary" onClick={() => {
            this.props.history.push("/posts/edit/" + data.id);
          }}>
            <i className="cui-pencil icons font-lg "/>
          </Button>
          <Button className="mr-1 btn-danger" onClick={() => this.renderAlert(data.id, index)}>
            <i className="cui-trash icons font-lg "/>
          </Button>
        </td>
      </tr>);
  }

  tabPane() {

    return (
      <>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th style={styles.topVertical}>ID</th>
                  <th style={styles.topVertical}>Logo</th>
                  <th>Tên người dùng
                    <Input bsSize="sm" type="text" id="name" name="name"
                           className="input-sm" placeholder="Tìm kiếm"
                           onChange={(event) => this.handleChange(event)}/>
                  </th>
                  <th>Email
                    <Input bsSize="sm" type="text" id="email" name="email"
                           className="input-sm" placeholder="Tìm kiếm"
                           onChange={(event) => this.handleChange(event)}/>
                  </th>
                  <th>Số điện thoại
                    <Input bsSize="sm" type="text" id="number_phone" name="number_phone"
                           className="input-sm" placeholder="Tìm kiếm"
                           onChange={(event) => this.handleChange(event)}/>
                  </th>
                  <th style={styles.topVertical}>Nút lệnh</th>
                </tr>
                </thead>
                <tbody>
                {this.renderCompanyRow()}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
      </>
    );
  }

  renderModal() {
    let data = this.state.data;
    if (this.state.modalId != null) {
      let currentBrocker = data.find(x => x.id === this.state.modalId);
      let index = this.state.modalId;
      let res;
      res = currentBrocker && currentBrocker.description || "";
      res = res.replace(/<img/g, '<img style="max-width: 700px !important"');
      return (
        <Modal isOpen={this.state.showModal} toggle={() => this.togglePrimary()}
               className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={() => this.togglePrimary(index)}>Xem trước giới thiệu về công ty môi giới</ModalHeader>
          <ModalBody>
            <Container>

              <Row className="show-grid">
                <Col xs={6} md={4}>
                  <img src={currentBrocker.avatar} alt="" style={{width: 240}}/>
                </Col>
                <Col xs={6} md={8}>
                  <p><h3>{currentBrocker.name}</h3></p>
                  <p><i className="icon-map icons mt-4"/> {currentBrocker.address}</p>
                  <p><i className="icon-screen-desktop icons mt-4"/> {currentBrocker.website}</p>
                  <p><i className="icon-envelope icons mt-4"/> {currentBrocker.email}</p>
                  <p><i className="icon-location-pin icons  mt-4"/> {currentBrocker.number_phone}</p>

                </Col>
              </Row>
              <hr/>
              <div>
                <h4>GIỚI THIỆU</h4>
                <div dangerouslySetInnerHTML={{ __html: res }} />

              </div>
            </Container>
          </ModalBody>
        </Modal>

      );
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="6">
              <p className="font-weight-bold">観光地管理</p>
            </Col>
            <Col xs="12" md="6">
              <InputGroup>
                <Input type="email" id="input2-group1" name="input2-group1" placeholder=""/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-search"/>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Row style={styles.lowMarginTop}>
            <Col xs="12" md="12" className="mb-4">
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
              </TabContent>
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
              </TabContent>
            </Col>
          </Row>
          {this.renderModal()}
          {this.state.alert}
        </div>
      );
    }
  }
}

export default Posts;
