import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comment!: Comment[]
  @Output() newComment = new EventEmitter<string>()

  commenCtrl!: FormControl
  constructor(private formBuild : FormBuilder){}

  ngOnInit(): void {
    this.commenCtrl = this.formBuild.control('',[Validators.required, Validators.minLength(10)])
  }

  leaveComment(){
    if (this.commenCtrl.invalid) {
      return;
    }
    this.newComment.emit(this.commenCtrl.value)
    this.commenCtrl.reset()
  }
}
